import * as THREE from 'three'
import { onLangChange, t } from './i18n.ts'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export type PitZoneViewerOptions = {
  mount: HTMLElement
  autoRotateButton: HTMLButtonElement | null
  resetButton: HTMLButtonElement | null
  viewButtons: HTMLButtonElement[]
  statusEl: HTMLElement | null
  progressEl: HTMLElement | null
  modelUrl: string
}

type ViewPreset = 'iso' | 'front' | 'side' | 'top'

type StatusKey = 'pit.viewer.loading' | 'pit.viewer.ready' | 'pit.viewer.error'

export function initPitZoneViewer(options: PitZoneViewerOptions): () => void {
  const { mount, autoRotateButton, resetButton, viewButtons, statusEl, progressEl, modelUrl } = options

  const width = Math.max(1, mount.clientWidth)
  const height = Math.max(1, mount.clientHeight)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x070405)
  scene.fog = new THREE.Fog(0x070405, 12, 30)

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.02, 200)
  camera.position.set(4, 2.6, 4)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.9
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  mount.appendChild(renderer.domElement)

  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.touchAction = 'none'

  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environmentIntensity = 0.45

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.07
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.7
  controls.minDistance = 0.6
  controls.maxDistance = 14
  controls.maxPolarAngle = Math.PI / 2 - 0.02
  controls.target.set(0, 0.8, 0)

  const hemi = new THREE.HemisphereLight(0xfff2f6, 0x1a0810, 0.55)
  scene.add(hemi)

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
  keyLight.position.set(5, 8, 4)
  keyLight.castShadow = true
  keyLight.shadow.mapSize.set(2048, 2048)
  keyLight.shadow.bias = -0.0004
  keyLight.shadow.normalBias = 0.02
  scene.add(keyLight)

  const rimLight = new THREE.DirectionalLight(0xf34a9a, 0.6)
  rimLight.position.set(-6, 3, -5)
  scene.add(rimLight)

  const fillLight = new THREE.DirectionalLight(0xa8c8ff, 0.35)
  fillLight.position.set(-4, 2, 5)
  scene.add(fillLight)

  // Floor + grid give the model a sense of scale and catch the frame's shadow.
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(9, 72),
    new THREE.MeshStandardMaterial({ color: 0x0c0709, roughness: 0.92, metalness: 0.05 }),
  )
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  const grid = new THREE.GridHelper(12, 24, 0xf34a9a, 0x3a1a28)
  const gridMat = grid.material as THREE.Material
  gridMat.transparent = true
  gridMat.opacity = 0.28
  grid.position.y = 0.002
  scene.add(grid)

  const modelGroup = new THREE.Group()
  scene.add(modelGroup)

  let animationId = 0
  let modelReady = false
  let hasError = false
  let modelRadius = 2
  const modelCenter = new THREE.Vector3(0, 0.8, 0)

  const setStatusText = (key: StatusKey) => {
    if (!statusEl) return
    statusEl.textContent = t(key)
    statusEl.classList.toggle('is-ready', key === 'pit.viewer.ready')
    statusEl.classList.toggle('is-error', key === 'pit.viewer.error')
  }

  const setProgress = (ratio: number | null) => {
    if (!progressEl) return
    if (ratio === null) {
      progressEl.classList.add('is-hidden')
      return
    }
    progressEl.classList.remove('is-hidden')
    progressEl.style.setProperty('--progress', `${Math.round(ratio * 100)}%`)
  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animationId = requestAnimationFrame(animate)

  const syncAutoRotateButton = () => {
    if (!autoRotateButton) return
    const on = controls.autoRotate
    autoRotateButton.setAttribute('aria-pressed', on ? 'true' : 'false')
    autoRotateButton.classList.toggle('is-active', on)
  }
  syncAutoRotateButton()

  // Smooth camera flights between presets instead of hard jumps.
  let flight: { fromPos: THREE.Vector3; toPos: THREE.Vector3; fromTarget: THREE.Vector3; toTarget: THREE.Vector3; start: number } | null = null
  const FLIGHT_MS = 650

  const flyTo = (position: THREE.Vector3, target: THREE.Vector3) => {
    flight = {
      fromPos: camera.position.clone(),
      toPos: position.clone(),
      fromTarget: controls.target.clone(),
      toTarget: target.clone(),
      start: performance.now(),
    }
    const step = (now: number) => {
      if (!flight) return
      const k = Math.min(1, (now - flight.start) / FLIGHT_MS)
      const e = 1 - Math.pow(1 - k, 3)
      camera.position.lerpVectors(flight.fromPos, flight.toPos, e)
      controls.target.lerpVectors(flight.fromTarget, flight.toTarget, e)
      if (k < 1) requestAnimationFrame(step)
      else flight = null
    }
    requestAnimationFrame(step)
  }

  // Distance at which the model's bounding sphere fits the viewport, accounting for portrait aspect ratios.
  const fitDistance = () => {
    const vFov = THREE.MathUtils.degToRad(camera.fov)
    let d = modelRadius / Math.sin(vFov / 2)
    if (camera.aspect < 1) d /= camera.aspect
    return d
  }

  const presetPosition = (preset: ViewPreset): THREE.Vector3 => {
    let d = fitDistance()
    const dir = new THREE.Vector3()
    switch (preset) {
      case 'front':
        dir.set(0, 0.12, 1)
        d *= 0.85
        break
      case 'side':
        dir.set(1, 0.12, 0)
        d *= 0.85
        break
      case 'top':
        dir.set(0, 1, 0.0005)
        break
      case 'iso':
      default:
        dir.set(1, 0.6, 1)
        break
    }
    return dir.normalize().multiplyScalar(d).add(modelCenter)
  }

  const setActiveView = (preset: ViewPreset | null) => {
    viewButtons.forEach((btn) => {
      const on = btn.dataset.view === preset
      btn.classList.toggle('is-active', on)
      btn.setAttribute('aria-pressed', on ? 'true' : 'false')
    })
  }

  const goToView = (preset: ViewPreset) => {
    controls.autoRotate = false
    syncAutoRotateButton()
    setActiveView(preset)
    flyTo(presetPosition(preset), modelCenter)
  }

  const onAutoClick = () => {
    controls.autoRotate = !controls.autoRotate
    syncAutoRotateButton()
  }

  const onResetClick = () => {
    setActiveView('iso')
    flyTo(presetPosition('iso'), modelCenter)
  }

  const viewHandlers = viewButtons.map((btn) => {
    const handler = () => {
      const view = btn.dataset.view as ViewPreset | undefined
      if (view) goToView(view)
    }
    btn.addEventListener('click', handler)
    return { btn, handler }
  })

  const onUserInteract = () => setActiveView(null)
  controls.addEventListener('start', onUserInteract)

  autoRotateButton?.addEventListener('click', onAutoClick)
  resetButton?.addEventListener('click', onResetClick)

  setProgress(0)

  const loader = new GLTFLoader()
  loader.load(
    modelUrl,
    (gltf) => {
      const model = gltf.scene

      // CAD export is Z-up in millimetres; bring it to Y-up metres.
      model.rotation.x = -Math.PI / 2
      model.scale.setScalar(0.001)
      model.updateMatrixWorld(true)

      model.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return
        obj.castShadow = true
        obj.receiveShadow = true
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial) {
            m.roughness = Math.min(0.75, Math.max(0.35, m.roughness))
            m.metalness = Math.min(0.45, m.metalness + 0.1)
            m.envMapIntensity = 0.9
            m.needsUpdate = true
          }
        })
      })

      const box = new THREE.Box3().setFromObject(model)
      const size = new THREE.Vector3()
      const center = new THREE.Vector3()
      box.getSize(size)
      box.getCenter(center)

      // Put the model's footprint centre at the origin and its lowest point on the floor.
      model.position.set(-center.x, -box.min.y, -center.z)
      modelGroup.add(model)
      model.updateMatrixWorld(true)

      const worldBox = new THREE.Box3().setFromObject(model)
      const sphere = new THREE.Sphere()
      worldBox.getBoundingSphere(sphere)
      modelRadius = Math.max(sphere.radius, 0.1)
      modelCenter.copy(sphere.center)

      controls.minDistance = modelRadius * 0.25
      controls.maxDistance = modelRadius * 6
      scene.fog = new THREE.Fog(0x070405, modelRadius * 5, modelRadius * 12)

      const shadowSpan = modelRadius * 1.6
      keyLight.shadow.camera.left = -shadowSpan
      keyLight.shadow.camera.right = shadowSpan
      keyLight.shadow.camera.top = shadowSpan
      keyLight.shadow.camera.bottom = -shadowSpan
      keyLight.shadow.camera.near = 0.5
      keyLight.shadow.camera.far = modelRadius * 8
      keyLight.position.set(modelRadius * 1.6, modelRadius * 2.6, modelRadius * 1.3)
      keyLight.target.position.copy(modelCenter)
      scene.add(keyLight.target)
      keyLight.shadow.camera.updateProjectionMatrix()

      camera.position.copy(presetPosition('iso'))
      controls.target.copy(modelCenter)
      controls.update()
      setActiveView('iso')

      modelReady = true
      setProgress(null)
      setStatusText('pit.viewer.ready')
    },
    (event) => {
      if (event.lengthComputable && event.total > 0) {
        setProgress(event.loaded / event.total)
      }
    },
    () => {
      hasError = true
      setProgress(null)
      setStatusText('pit.viewer.error')
    },
  )

  const stopLang = onLangChange(() => {
    if (hasError) setStatusText('pit.viewer.error')
    else if (modelReady) setStatusText('pit.viewer.ready')
    else setStatusText('pit.viewer.loading')
  })

  const resize = () => {
    const w = Math.max(1, mount.clientWidth)
    const h = Math.max(1, mount.clientHeight)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }

  const ro = new ResizeObserver(resize)
  ro.observe(mount)

  return () => {
    stopLang()
    cancelAnimationFrame(animationId)
    ro.disconnect()
    controls.removeEventListener('start', onUserInteract)
    autoRotateButton?.removeEventListener('click', onAutoClick)
    resetButton?.removeEventListener('click', onResetClick)
    viewHandlers.forEach(({ btn, handler }) => btn.removeEventListener('click', handler))
    controls.dispose()
    pmrem.dispose()
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose()
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m) => m.dispose())
      }
    })
    renderer.dispose()
    if (renderer.domElement.parentElement === mount) {
      mount.removeChild(renderer.domElement)
    }
  }
}
