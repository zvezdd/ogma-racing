import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

export type CarViewerOptions = {
  mount: HTMLElement
  autoRotateButton: HTMLButtonElement | null
  resetButton: HTMLButtonElement | null
  statusEl: HTMLElement | null
}

export function initCarViewer(options: CarViewerOptions): () => void {
  const { mount, autoRotateButton, resetButton, statusEl } = options

  const width = Math.max(1, mount.clientWidth)
  const height = Math.max(1, mount.clientHeight)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0606)

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.01, 5000)
  camera.position.set(2.2, 1.4, 2.2)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  mount.appendChild(renderer.domElement)

  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.touchAction = 'none'

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.9
  controls.minDistance = 0.35
  controls.maxDistance = 12
  controls.target.set(0, 0, 0)

  const initialCameraPosition = camera.position.clone()
  const initialTarget = controls.target.clone()

  const ambient = new THREE.AmbientLight(0xffffff, 0.42)
  scene.add(ambient)

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.15)
  keyLight.position.set(6, 10, 7)
  scene.add(keyLight)

  const rimLight = new THREE.DirectionalLight(0xf34a9a, 0.45)
  rimLight.position.set(-5, 4, -6)
  scene.add(rimLight)

  const fillLight = new THREE.DirectionalLight(0xa8c8ff, 0.22)
  fillLight.position.set(-4, 1, 4)
  scene.add(fillLight)

  let mesh: THREE.Mesh | null = null
  let animationId = 0

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

  const onAutoClick = () => {
    controls.autoRotate = !controls.autoRotate
    syncAutoRotateButton()
  }

  const onResetClick = () => {
    camera.position.copy(initialCameraPosition)
    controls.target.copy(initialTarget)
    controls.update()
  }

  autoRotateButton?.addEventListener('click', onAutoClick)
  resetButton?.addEventListener('click', onResetClick)

  const loader = new STLLoader()
  loader.load(
    '/models/ogmalast67.stl',
    (geometry) => {
      geometry.computeVertexNormals()
      geometry.center()

      const material = new THREE.MeshStandardMaterial({
        color: 0xc5c2be,
        metalness: 0.5,
        roughness: 0.38,
        envMapIntensity: 0.9,
      })

      const loadedMesh = new THREE.Mesh(geometry, material)
      loadedMesh.castShadow = false
      loadedMesh.receiveShadow = false

      const box = new THREE.Box3().setFromObject(loadedMesh)
      const size = new THREE.Vector3()
      box.getSize(size)
      const maxDim = Math.max(size.x, size.y, size.z, 1e-6)
      const fit = 1.85 / maxDim
      loadedMesh.scale.setScalar(fit)

      mesh = loadedMesh
      scene.add(loadedMesh)

      loadedMesh.updateMatrixWorld(true)
      const worldBox = new THREE.Box3().setFromObject(loadedMesh)
      const sphere = new THREE.Sphere()
      worldBox.getBoundingSphere(sphere)
      const r = Math.max(sphere.radius, 0.01)
      const offset = new THREE.Vector3(r * 1.75, r * 0.95, r * 1.75)
      camera.position.copy(sphere.center).add(offset)
      controls.target.copy(sphere.center)
      controls.update()

      initialCameraPosition.copy(camera.position)
      initialTarget.copy(controls.target)

      if (statusEl) {
        statusEl.textContent = 'Drag to orbit · Scroll to zoom · Right-drag to pan'
        statusEl.classList.add('is-ready')
      }
    },
    undefined,
    () => {
      if (statusEl) {
        statusEl.textContent = 'Could not load the 3D model. Check that the file is in /public/models/.'
        statusEl.classList.add('is-error')
      }
    },
  )

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
    cancelAnimationFrame(animationId)
    ro.disconnect()
    autoRotateButton?.removeEventListener('click', onAutoClick)
    resetButton?.removeEventListener('click', onResetClick)
    controls.dispose()
    renderer.dispose()
    if (renderer.domElement.parentElement === mount) {
      mount.removeChild(renderer.domElement)
    }
    if (mesh) {
      mesh.geometry.dispose()
      const mat = mesh.material
      if (!Array.isArray(mat)) mat.dispose()
      else mat.forEach((m) => m.dispose())
    }
  }
}
