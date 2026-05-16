export type PitStopMemoryOptions = {
  mount: HTMLElement
}

type CardKind = 'tire-slick' | 'tire-wet' | 'wrench' | 'jack' | 'piston' | 'spark-plug'

type CardDef = {
  kind: CardKind
  label: string
  category: 'tires' | 'tools' | 'engine'
}

type DeckCard = CardDef & { pairIndex: number; uid: number }

const CARD_DEFS: CardDef[] = [
  { kind: 'tire-slick', label: 'Slick tyre', category: 'tires' },
  { kind: 'tire-wet', label: 'Wet tyre', category: 'tires' },
  { kind: 'wrench', label: 'Wheel gun', category: 'tools' },
  { kind: 'jack', label: 'Pit jack', category: 'tools' },
  { kind: 'piston', label: 'Piston', category: 'engine' },
  { kind: 'spark-plug', label: 'Spark plug', category: 'engine' },
]

const ICONS: Record<CardKind, string> = {
  'tire-slick': `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="32" r="22" stroke="currentColor" stroke-width="2.5"/>
    <circle cx="32" cy="32" r="10" stroke="currentColor" stroke-width="2"/>
    <path d="M32 10v6M32 48v6M10 32h6M48 32h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  'tire-wet': `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="32" r="22" stroke="currentColor" stroke-width="2.5"/>
    <circle cx="32" cy="32" r="10" stroke="currentColor" stroke-width="2"/>
    <path d="M18 22c4 6 8 10 14 10s10-4 14-10M20 42c3 4 7 6 12 6s9-2 12-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  wrench: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M44 14a12 12 0 0 0-17 17L16 42l6 6 11-11a12 12 0 0 0 17-17l-8 8-6-6 8-8Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
  </svg>`,
  jack: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M12 46h40M20 46V28l12-10 12 10v18" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M26 46V34h12v12" stroke="currentColor" stroke-width="2"/>
    <circle cx="32" cy="20" r="4" stroke="currentColor" stroke-width="2"/>
  </svg>`,
  piston: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="22" y="12" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
    <path d="M32 26v22M24 48h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M18 48h28M20 54h24" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`,
  'spark-plug': `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M28 10h8v10h-8zM26 20h12v8H26v-8Z" stroke="currentColor" stroke-width="2"/>
    <path d="M30 28v18M34 28v18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M22 46h20l-2 8H24l-2-8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    <path d="M32 10v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
}

const CATEGORY_LABEL: Record<CardDef['category'], string> = {
  tires: 'Tyres',
  tools: 'Tools',
  engine: 'Engine',
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildDeck(): DeckCard[] {
  return shuffle(
    CARD_DEFS.flatMap((def, pairIndex) => [
      { ...def, pairIndex, uid: pairIndex * 2 },
      { ...def, pairIndex, uid: pairIndex * 2 + 1 },
    ]),
  )
}

function cardMarkup(card: DeckCard, index: number): string {
  const category = CATEGORY_LABEL[card.category]
  return `
    <button
      type="button"
      class="memory-card"
      data-index="${index}"
      data-pair="${card.pairIndex}"
      aria-label="Card ${index + 1}, ${category}"
    >
      <span class="memory-card-inner">
        <span class="memory-card-face memory-card-back">
          <span class="memory-card-code">PIT</span>
        </span>
        <span class="memory-card-face memory-card-front" data-category="${card.category}">
          <span class="memory-card-icon">${ICONS[card.kind]}</span>
          <span class="memory-card-label">${card.label}</span>
          <span class="memory-card-tag">${category}</span>
        </span>
      </span>
    </button>
  `
}

export function initPitStopMemory({ mount }: PitStopMemoryOptions): () => void {
  let deck = buildDeck()
  let flipped: number[] = []
  let locked = false
  let matchedCount = 0
  const totalPairs = CARD_DEFS.length

  const shell = document.createElement('div')
  shell.className = 'memory-game'
  shell.setAttribute('aria-label', 'Pit stop memory game')

  const hud = document.createElement('div')
  hud.className = 'memory-hud'

  const statusEl = document.createElement('p')
  statusEl.className = 'memory-status'
  statusEl.id = 'memoryStatus'
  statusEl.setAttribute('aria-live', 'polite')
  statusEl.textContent = 'Find matching pairs in the pit lane.'

  const restartBtn = document.createElement('button')
  restartBtn.type = 'button'
  restartBtn.className = 'memory-restart'
  restartBtn.id = 'memoryRestart'
  restartBtn.textContent = 'New grid'

  const board = document.createElement('div')
  board.className = 'memory-board'
  board.id = 'memoryBoard'
  board.setAttribute('role', 'grid')

  hud.append(statusEl, restartBtn)
  shell.append(hud, board)
  mount.replaceChildren(shell)

  const setStatus = (message: string) => {
    statusEl.textContent = message
  }

  const renderBoard = () => {
    board.innerHTML = deck.map((card, index) => cardMarkup(card, index)).join('')
  }

  const resetGame = () => {
    deck = buildDeck()
    flipped = []
    locked = false
    matchedCount = 0
    renderBoard()
    setStatus('Find matching pairs in the pit lane.')
  }

  const onBoardClick = (event: Event) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>('.memory-card')
    if (!target || locked) return

    const index = Number(target.dataset.index)
    if (
      Number.isNaN(index) ||
      target.classList.contains('is-flipped') ||
      target.classList.contains('is-matched')
    ) {
      return
    }

    if (flipped.length === 1 && flipped[0] === index) return

    target.classList.add('is-flipped')
    flipped.push(index)

    if (flipped.length < 2) return

    locked = true
    const [firstIndex, secondIndex] = flipped
    const first = board.querySelector<HTMLButtonElement>(`[data-index="${firstIndex}"]`)
    const second = board.querySelector<HTMLButtonElement>(`[data-index="${secondIndex}"]`)
    const isMatch = first?.dataset.pair === second?.dataset.pair

    window.setTimeout(() => {
      if (isMatch && first && second) {
        first.classList.add('is-matched')
        second.classList.add('is-matched')
        matchedCount += 1
        setStatus(`${matchedCount} of ${totalPairs} pairs secured.`)

        if (matchedCount >= totalPairs) {
          setStatus('Pit stop complete — every pair matched.')
        }
      } else if (first && second) {
        first.classList.remove('is-flipped')
        second.classList.remove('is-flipped')
        setStatus('No match — try another pair.')
      }

      flipped = []
      locked = false
    }, 700)
  }

  renderBoard()
  board.addEventListener('click', onBoardClick)
  restartBtn.addEventListener('click', resetGame)

  return () => {
    board.removeEventListener('click', onBoardClick)
    restartBtn.removeEventListener('click', resetGame)
    mount.replaceChildren()
  }
}
