export type FindFaultOptions = {
  mount: HTMLElement
}

type HitZone = {
  id: string
  left: number
  top: number
  width: number
  height: number
  label: string
}

type LevelDef = {
  id: string
  title: string
  faults: number
  instruction: string
  image: string
  imageAlt: string
  zones: HitZone[]
}

const IMG = '/images/find-fault'

const LEVELS: LevelDef[] = [
  {
    id: 'missing-wheel',
    title: 'Level 1 · Pit lane',
    faults: 1,
    instruction: 'One wheel is missing. Tap where the fault is.',
    image: `${IMG}/level-01-missing-wheel.png`,
    imageAlt: 'F1 car in a garage with a missing front wheel',
    zones: [
      {
        id: 'missing-wheel',
        left: 40,
        top: 56,
        width: 14,
        height: 18,
        label: 'Missing front wheel',
      },
    ],
  },
  {
    id: 'wrong-livery',
    title: 'Level 2 · Paint check',
    faults: 1,
    instruction: 'The car has the wrong team colours. Find the mistake.',
    image: `${IMG}/level-02-wrong-livery.png`,
    imageAlt: 'F1 car with incorrect red, white and blue body colours',
    zones: [
      {
        id: 'wrong-livery',
        left: 44,
        top: 46,
        width: 18,
        height: 16,
        label: 'Wrong body colour',
      },
    ],
  },
  {
    id: 'extra-tool',
    title: 'Level 3 · Garage floor',
    faults: 1,
    instruction: 'Something does not belong in the pit lane. Tap it.',
    image: `${IMG}/level-03-extra-tool.png`,
    imageAlt: 'F1 car in a garage with a wrench on the floor',
    zones: [
      {
        id: 'extra-tool',
        left: 62,
        top: 68,
        width: 26,
        height: 16,
        label: 'Extra tool on the floor',
      },
    ],
  },
  {
    id: 'rear-wing',
    title: 'Level 4 · Aero inspection',
    faults: 1,
    instruction: 'Find the damaged part on the car.',
    image: `${IMG}/level-04-rear-wing.png`,
    imageAlt: 'F1 car in a garage with a damaged rear wing endplate',
    zones: [
      {
        id: 'rear-wing',
        left: 74,
        top: 34,
        width: 12,
        height: 14,
        label: 'Damaged rear wing',
      },
    ],
  },
]

function sceneMarkup(level: LevelDef): string {
  const zones = level.zones
    .map(
      (zone) => `<button
    type="button"
    class="fault-zone"
    data-id="${zone.id}"
    style="left:${zone.left}%;top:${zone.top}%;width:${zone.width}%;height:${zone.height}%"
    aria-label="Inspect: ${zone.label}"
  ></button>`,
    )
    .join('')

  return `<img
    class="fault-art"
    src="${level.image}"
    alt="${level.imageAlt}"
    draggable="false"
    decoding="async"
  />${zones}`
}

export function initFindFault({ mount }: FindFaultOptions): () => void {
  let levelIndex = 0
  const found = new Set<string>()

  const shell = document.createElement('div')
  shell.className = 'fault-game'

  const hud = document.createElement('div')
  hud.className = 'fault-hud'

  const levelTitle = document.createElement('p')
  levelTitle.className = 'fault-level-title'

  const statusEl = document.createElement('p')
  statusEl.className = 'fault-status'
  statusEl.setAttribute('aria-live', 'polite')

  const progressEl = document.createElement('p')
  progressEl.className = 'fault-progress'

  const controls = document.createElement('div')
  controls.className = 'fault-controls'

  const prevBtn = document.createElement('button')
  prevBtn.type = 'button'
  prevBtn.className = 'fault-btn'
  prevBtn.textContent = 'Previous'

  const nextBtn = document.createElement('button')
  nextBtn.type = 'button'
  nextBtn.className = 'fault-btn fault-btn-primary'
  nextBtn.textContent = 'Next level'

  const sceneWrap = document.createElement('div')
  sceneWrap.className = 'fault-scene-wrap'

  const scene = document.createElement('div')
  scene.className = 'fault-scene'
  scene.setAttribute('role', 'img')

  hud.append(levelTitle, statusEl, progressEl)
  controls.append(prevBtn, nextBtn)
  sceneWrap.append(scene)
  shell.append(hud, sceneWrap, controls)
  mount.replaceChildren(shell)

  const level = () => LEVELS[levelIndex]

  const updateProgress = () => {
    const current = level()
    progressEl.textContent = `Found ${found.size} of ${current.faults}`
    prevBtn.disabled = levelIndex === 0
    nextBtn.textContent =
      levelIndex >= LEVELS.length - 1 ? 'Play again' : 'Next level'
    nextBtn.disabled = found.size < current.faults
  }

  const setStatus = (message: string) => {
    statusEl.textContent = message
  }

  const onZoneClick = (btn: HTMLButtonElement) => {
    const id = btn.dataset.id
    if (!id || found.has(id) || btn.classList.contains('is-found')) return

    const zone = level().zones.find((z) => z.id === id)
    if (!zone) return

    found.add(id)
    btn.classList.add('is-found')
    setStatus(`Correct — ${zone.label}.`)

    if (found.size >= level().faults) {
      setStatus(
        levelIndex >= LEVELS.length - 1
          ? 'Inspection complete. You found every fault.'
          : 'Bay clear. Continue to the next level when ready.',
      )
    }

    updateProgress()
  }

  const renderLevel = () => {
    found.clear()
    const current = level()
    levelTitle.textContent = current.title
    setStatus(current.instruction)
    scene.setAttribute('aria-label', current.instruction)
    scene.innerHTML = sceneMarkup(current)

    scene.querySelectorAll<HTMLButtonElement>('.fault-zone').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation()
        onZoneClick(btn)
      })
    })

    updateProgress()
  }

  const onSceneMiss = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest('.fault-zone')) return
    if (found.size >= level().faults) return
    setStatus('Not that spot — keep inspecting the car and garage.')
  }

  const goNext = () => {
    if (found.size < level().faults) return
    levelIndex = levelIndex >= LEVELS.length - 1 ? 0 : levelIndex + 1
    renderLevel()
  }

  const goPrev = () => {
    if (levelIndex === 0) return
    levelIndex -= 1
    renderLevel()
  }

  scene.addEventListener('click', onSceneMiss)
  nextBtn.addEventListener('click', goNext)
  prevBtn.addEventListener('click', goPrev)

  renderLevel()

  return () => {
    scene.removeEventListener('click', onSceneMiss)
    nextBtn.removeEventListener('click', goNext)
    prevBtn.removeEventListener('click', goPrev)
    mount.replaceChildren()
  }
}
