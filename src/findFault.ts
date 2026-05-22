import { onLangChange, t } from './i18n.ts'

export type FindFaultOptions = {
  mount: HTMLElement
}

type HitZone = {
  id: string
  left: number
  top: number
  width: number
  height: number
  labelKey: string
}

type LevelDef = {
  id: string
  titleKey: string
  faults: number
  instructionKey: string
  imageAltKey: string
  image: string
  zones: HitZone[]
}

const IMG = '/images/find-fault'

const LEVELS: LevelDef[] = [
  {
    id: 'missing-wheel',
    titleKey: 'fault.l1.title',
    faults: 1,
    instructionKey: 'fault.l1.hint',
    imageAltKey: 'fault.l1.zone',
    image: `${IMG}/level-01-missing-wheel.png`,
    zones: [
      { id: 'missing-wheel', left: 40, top: 56, width: 14, height: 18, labelKey: 'fault.l1.zone' },
    ],
  },
  {
    id: 'wrong-livery',
    titleKey: 'fault.l2.title',
    faults: 1,
    instructionKey: 'fault.l2.hint',
    imageAltKey: 'fault.l2.zone',
    image: `${IMG}/level-02-wrong-livery.png`,
    zones: [
      { id: 'wrong-livery', left: 44, top: 46, width: 18, height: 16, labelKey: 'fault.l2.zone' },
    ],
  },
  {
    id: 'extra-tool',
    titleKey: 'fault.l3.title',
    faults: 1,
    instructionKey: 'fault.l3.hint',
    imageAltKey: 'fault.l3.zone',
    image: `${IMG}/level-03-extra-tool.png`,
    zones: [
      { id: 'extra-tool', left: 62, top: 68, width: 26, height: 16, labelKey: 'fault.l3.zone' },
    ],
  },
  {
    id: 'rear-wing',
    titleKey: 'fault.l4.title',
    faults: 1,
    instructionKey: 'fault.l4.hint',
    imageAltKey: 'fault.l4.zone',
    image: `${IMG}/level-04-rear-wing.png`,
    zones: [
      { id: 'rear-wing', left: 74, top: 34, width: 12, height: 14, labelKey: 'fault.l4.zone' },
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
    aria-label="Inspect: ${t(zone.labelKey)}"
  ></button>`,
    )
    .join('')

  return `<img
    class="fault-art"
    src="${level.image}"
    alt="${t(level.instructionKey)}"
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
  prevBtn.dataset.i18n = 'fault.prev'

  const nextBtn = document.createElement('button')
  nextBtn.type = 'button'
  nextBtn.className = 'fault-btn fault-btn-primary'

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
    progressEl.textContent = t('fault.found', { n: found.size, total: current.faults })
    prevBtn.disabled = levelIndex === 0
    nextBtn.textContent =
      levelIndex >= LEVELS.length - 1 ? t('fault.replay') : t('fault.next')
    nextBtn.disabled = found.size < current.faults
    prevBtn.textContent = t('fault.prev')
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
    setStatus(t('fault.correct', { label: t(zone.labelKey) }))

    if (found.size >= level().faults) {
      setStatus(
        levelIndex >= LEVELS.length - 1 ? t('fault.done') : t('fault.nextReady'),
      )
    }

    updateProgress()
  }

  const renderLevel = () => {
    found.clear()
    const current = level()
    levelTitle.textContent = t(current.titleKey)
    setStatus(t(current.instructionKey))
    scene.setAttribute('aria-label', t(current.instructionKey))
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
    setStatus(t('fault.miss'))
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
  const stopLang = onLangChange(renderLevel)

  return () => {
    stopLang()
    scene.removeEventListener('click', onSceneMiss)
    nextBtn.removeEventListener('click', goNext)
    prevBtn.removeEventListener('click', goPrev)
    mount.replaceChildren()
  }
}
