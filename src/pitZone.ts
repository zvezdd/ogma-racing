import './style.css'
import { initI18n } from './i18n.ts'

const PIT_MODEL_URL = '/models/pit-zone.glb'

const parts = [
  { key: 'frame', swatch: '#e8172e' },
  { key: 'table', swatch: '#c7c4c1' },
  { key: 'chair', swatch: '#141414' },
  { key: 'wheel', swatch: '#0d0d0d' },
  { key: 'light', swatch: '#595959' },
]

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing app root element.')
}

app.innerHTML = `
  <div class="page-bg">
    <div class="orb orb-blue"></div>
    <div class="orb orb-gold"></div>
  </div>
  <div class="noise"></div>

  <nav class="navbar" id="navbar">
    <div class="container nav-inner">
      <a href="/" class="brand">
        <img class="brand-logo" src="/images/ogma-logo.png?v=2" alt="OGMA" />
      </a>
      <div class="lang-switch" role="group" data-i18n-aria="nav.lang">
        <button type="button" class="lang-switch-btn is-active" data-lang="en" aria-pressed="true" data-i18n="lang.en">EN</button>
        <button type="button" class="lang-switch-btn" data-lang="ru" aria-pressed="false" data-i18n="lang.ru">RU</button>
      </div>
      <button class="nav-toggle" id="navToggle" data-i18n-aria="nav.toggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" id="navLinks">
        <a href="/#journey" data-i18n="nav.journey">Journey</a>
        <a href="/#about" data-i18n="nav.about">About</a>
        <a href="/#team" data-i18n="nav.team">Team</a>
        <a href="/#car" data-i18n="nav.car">Car</a>
        <a href="/pit-zone.html" class="is-current" aria-current="page" data-i18n="nav.pitZone">Pit Zone</a>
        <a href="/#gallery" data-i18n="nav.gallery">Gallery</a>
        <a href="/" class="btn btn-ghost btn-sm" data-i18n="pit.back">← Back to site</a>
      </div>
    </div>
  </nav>

  <main class="pit-page">
    <section class="section pit-hero" id="pit-zone">
      <div class="container">
        <span class="section-label reveal" data-i18n="pit.label">PIT ZONE</span>
        <h1 class="section-title reveal" data-i18n="pit.title">Our Pit Box in 3D</h1>
        <p class="pit-intro reveal" data-i18n="pit.intro">
          The full CAD assembly of the Ogma pit zone — frame, sim rig, table, chair and reaction light. Rotate, zoom and inspect it from any angle.
        </p>

        <article class="car-viewer-card pit-viewer-card reveal">
          <div class="car-viewer-body pit-viewer-body">
            <div
              class="car-viewer-mount pit-viewer-mount"
              id="pitViewerMount"
              data-i18n-aria="pit.viewer.aria"
              aria-label="Interactive 3D model of the pit zone"
            >
              <div class="pit-progress" id="pitViewerProgress" aria-hidden="true">
                <span class="pit-progress-bar"></span>
              </div>
            </div>
            <div class="car-viewer-chrome pit-viewer-chrome">
              <p class="car-viewer-status" id="pitViewerStatus" data-i18n="pit.viewer.loading">Loading pit zone…</p>
              <div class="car-viewer-actions pit-viewer-actions">
                <div class="pit-view-group" role="group" data-i18n-aria="pit.viewer.views" aria-label="Camera presets">
                  <button type="button" class="car-viewer-btn is-active" data-view="iso" aria-pressed="true" data-i18n="pit.viewer.iso">3D</button>
                  <button type="button" class="car-viewer-btn" data-view="front" aria-pressed="false" data-i18n="pit.viewer.front">Front</button>
                  <button type="button" class="car-viewer-btn" data-view="side" aria-pressed="false" data-i18n="pit.viewer.side">Side</button>
                  <button type="button" class="car-viewer-btn" data-view="top" aria-pressed="false" data-i18n="pit.viewer.top">Top</button>
                </div>
                <button type="button" class="car-viewer-btn is-active" id="pitViewerAuto" aria-pressed="true" data-i18n="car.viewer.auto">Auto spin</button>
                <button type="button" class="car-viewer-btn" id="pitViewerReset" data-i18n="car.viewer.reset">Reset view</button>
              </div>
            </div>
          </div>
        </article>

        <div class="pit-meta-grid">
          <article class="stat-card pit-stat reveal">
            <h3>2.95 <small>m</small></h3>
            <p data-i18n="pit.dim.width">Width</p>
          </article>
          <article class="stat-card pit-stat reveal">
            <h3>0.94 <small>m</small></h3>
            <p data-i18n="pit.dim.depth">Depth</p>
          </article>
          <article class="stat-card pit-stat reveal">
            <h3>2.40 <small>m</small></h3>
            <p data-i18n="pit.dim.height">Height</p>
          </article>
          <article class="stat-card pit-stat reveal">
            <h3>5</h3>
            <p data-i18n="pit.dim.modules">Modules</p>
          </article>
        </div>

        <div class="pit-parts">
          <span class="section-label reveal" data-i18n="pit.parts.label">WHAT'S INSIDE</span>
          <div class="pit-parts-grid">
            ${parts
              .map(
                (part) => `
                  <article class="detail-card pit-part-card reveal">
                    <span class="pit-part-swatch" style="--swatch: ${part.swatch}"></span>
                    <div>
                      <h3 data-i18n="pit.parts.${part.key}.title"></h3>
                      <p data-i18n="pit.parts.${part.key}.body"></p>
                    </div>
                  </article>
                `,
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <a href="/" class="brand footer-brand">
          <img class="brand-logo" src="/images/ogma-logo.png?v=2" alt="OGMA" />
        </a>
        <p data-i18n="footer.tagline">Technical precision meets creative ambition.</p>
      </div>
      <div class="footer-links">
        <a href="/#journey" data-i18n="nav.journey">Journey</a>
        <a href="/#about" data-i18n="nav.about">About</a>
        <a href="/#team" data-i18n="nav.team">Team</a>
        <a href="/#car" data-i18n="nav.car">Car</a>
        <a href="/pit-zone.html" data-i18n="nav.pitZone">Pit Zone</a>
        <a href="/#gallery" data-i18n="nav.gallery">Gallery</a>
      </div>
      <p class="footer-copy" data-i18n="footer.copy">Ogma Racing Team © 2026 · Built with passion</p>
    </div>
  </footer>
`

const navbar = document.getElementById('navbar')
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')
const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
const mount = document.getElementById('pitViewerMount')
const autoRotateButton = document.getElementById('pitViewerAuto') as HTMLButtonElement | null
const resetButton = document.getElementById('pitViewerReset') as HTMLButtonElement | null
const viewButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-view]'))
const statusEl = document.getElementById('pitViewerStatus')
const progressEl = document.getElementById('pitViewerProgress')

initI18n()

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const element = entry.target as HTMLElement
      const siblings = Array.from(element.parentElement?.children ?? [])
      const index = siblings.indexOf(element)
      element.style.transitionDelay = `${Math.max(0, index) * 80}ms`
      element.classList.add('revealed')
      revealObserver.unobserve(element)
    })
  },
  { threshold: 0.15 },
)

revealItems.forEach((item) => revealObserver.observe(item))

const syncNavbar = () => {
  if (!navbar) return
  navbar.classList.toggle('scrolled', window.scrollY > 30)
}
window.addEventListener('scroll', syncNavbar)
syncNavbar()

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open')
  })
}

if (mount) {
  void import('./pitZoneViewer.ts').then(({ initPitZoneViewer }) => {
    initPitZoneViewer({
      mount,
      autoRotateButton,
      resetButton,
      viewButtons,
      statusEl,
      progressEl,
      modelUrl: PIT_MODEL_URL,
    })
  })
}
