export type PitTimerOptions = {
  mount: HTMLElement
}

function formatTime(ms: number): string {
  const totalCs = Math.floor(ms / 10)
  const cs = totalCs % 100
  const totalSec = Math.floor(totalCs / 100)
  const sec = totalSec % 60
  const min = Math.floor(totalSec / 60)
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(cs).padStart(2, '0')}`
}

export function initPitTimer({ mount }: PitTimerOptions): () => void {
  let elapsed = 0
  let running = false
  let rafId = 0
  let startedAt = 0

  const shell = document.createElement('div')
  shell.className = 'pit-timer'

  shell.innerHTML = `
    <div class="pit-timer-panel">
      <div class="pit-timer-chrome">
        <span class="pit-timer-badge">OGMA PIT</span>
        <span class="pit-timer-live" id="pitTimerLive" hidden aria-hidden="true">LIVE</span>
      </div>
      <p class="pit-timer-label">Session time</p>
      <div class="pit-timer-display" id="pitTimerDisplay" aria-live="polite">00:00.00</div>
      <div class="pit-timer-bar" aria-hidden="true"><span id="pitTimerBar"></span></div>
    </div>
    <div class="pit-timer-actions">
      <button type="button" class="pit-timer-btn pit-timer-btn-start" id="pitTimerStart">Start</button>
      <button type="button" class="pit-timer-btn pit-timer-btn-reset" id="pitTimerReset">Reset</button>
    </div>
  `

  mount.replaceChildren(shell)

  const display = shell.querySelector<HTMLElement>('#pitTimerDisplay')!
  const live = shell.querySelector<HTMLElement>('#pitTimerLive')!
  const bar = shell.querySelector<HTMLElement>('#pitTimerBar')!
  const startBtn = shell.querySelector<HTMLButtonElement>('#pitTimerStart')!
  const resetBtn = shell.querySelector<HTMLButtonElement>('#pitTimerReset')!
  const panel = shell.querySelector<HTMLElement>('.pit-timer-panel')!

  const render = () => {
    display.textContent = formatTime(elapsed)
    const pulse = running ? Math.min(100, (elapsed % 1000) / 10) : 0
    bar.style.width = running ? `${20 + pulse * 0.6}%` : '0%'
  }

  const tick = () => {
    if (!running) return
    elapsed = performance.now() - startedAt
    render()
    rafId = requestAnimationFrame(tick)
  }

  const setRunning = (next: boolean) => {
    running = next
    panel.classList.toggle('is-running', running)
    live.hidden = !running
    startBtn.textContent = running ? 'Pause' : 'Start'
    startBtn.setAttribute('aria-pressed', String(running))

    if (running) {
      startedAt = performance.now() - elapsed
      rafId = requestAnimationFrame(tick)
    } else {
      cancelAnimationFrame(rafId)
    }
  }

  const onStart = () => {
    setRunning(!running)
  }

  const onReset = () => {
    setRunning(false)
    elapsed = 0
    render()
  }

  startBtn.addEventListener('click', onStart)
  resetBtn.addEventListener('click', onReset)
  render()

  return () => {
    cancelAnimationFrame(rafId)
    startBtn.removeEventListener('click', onStart)
    resetBtn.removeEventListener('click', onReset)
    mount.replaceChildren()
  }
}
