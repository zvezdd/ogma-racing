import './style.css'
import { initI18n, t } from './i18n.ts'

const teamMembers = [
  {
    name: 'Arystanbek Adilzhan',
    roleKey: 'team.roles.cap',
    bioKey: 'team.bios.arystanbek',
    image: 'https://placehold.co/640x760/120606/fafafa?text=Arystanbek',
    social: '#',
  },
  {
    name: 'Aimuratov Azamat',
    roleKey: 'team.roles.aero',
    bioKey: 'team.bios.azamat',
    image: 'https://placehold.co/640x760/120606/fafafa?text=Azamat',
    social: '#',
  },
  {
    name: 'Tsoy Anastasiya',
    roleKey: 'team.roles.mfg',
    bioKey: 'team.bios.anastasiya',
    image: 'https://placehold.co/640x760/120606/fafafa?text=Anastasiya',
    social: '#',
  },
  {
    name: 'Mukan Ibrahim',
    roleKey: 'team.roles.power',
    bioKey: 'team.bios.ibrahim',
    image: 'https://placehold.co/640x760/120606/fafafa?text=Ibrahim',
    social: '#',
  },
  {
    name: 'Fazylov Damir',
    roleKey: 'team.roles.data',
    bioKey: 'team.bios.damir',
    image: 'https://placehold.co/640x760/120606/fafafa?text=Damir',
    social: '#',
  },
  {
    name: 'Abdilda Zhasmin',
    roleKey: 'team.roles.brand',
    bioKey: 'team.bios.zhasmin',
    image: 'https://placehold.co/640x760/120606/fafafa?text=Zhasmin',
    social: '#',
  },
]

const galleryImages = [
  '/images/cad-model-1.png',
  '/images/cad-model-2.png',
  'https://placehold.co/900x780/120606/f34a9a?text=Chassis+Assembly',
  'https://placehold.co/900x620/120606/f34a9a?text=Pit+Preparation',
  'https://placehold.co/900x720/120606/f34a9a?text=Team+Review',
  'https://placehold.co/900x560/120606/f34a9a?text=Race+Simulation',
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
      <a href="#hero" class="brand">
        <img class="brand-logo" src="/images/ogma-logo.png" alt="OGMA" />
      </a>
      <div class="lang-switch" role="group" data-i18n-aria="nav.lang">
        <button type="button" class="lang-switch-btn is-active" data-lang="en" aria-pressed="true" data-i18n="lang.en">EN</button>
        <button type="button" class="lang-switch-btn" data-lang="ru" aria-pressed="false" data-i18n="lang.ru">RU</button>
      </div>
      <button class="nav-toggle" id="navToggle" data-i18n-aria="nav.toggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" id="navLinks">
        <a href="#event" data-i18n="nav.event">Event</a>
        <a href="#about" data-i18n="nav.about">About</a>
        <a href="#team" data-i18n="nav.team">Team</a>
        <a href="#car" data-i18n="nav.car">Car</a>
        <a href="#pit-memory" data-i18n="nav.pitMemory">Pit Memory</a>
        <a href="#find-fault" data-i18n="nav.findFault">Find Fault</a>
        <a href="#pit-timer" data-i18n="nav.pitTimer">Pit Timer</a>
        <a href="#gallery" data-i18n="nav.gallery">Gallery</a>
        <a href="#socials" data-i18n="nav.socials">Socials</a>
        <a href="#socials" class="btn btn-primary btn-sm" data-i18n="nav.join">Join Our Journey</a>
      </div>
    </div>
  </nav>

  <main>
    <section class="hero-section" id="hero">
      <div class="container hero-content">
        <span class="section-badge reveal">
          <span class="badge-dot"></span>
          <span data-i18n="hero.badge">Kazakhstan Racing · STEM 2026</span>
        </span>
        <h1 class="hero-title">
          <span class="hero-white">OG</span><span class="hero-yellow">MA</span>
        </h1>
        <p class="hero-subtitle reveal">
          <span data-i18n="hero.subtitle">Engineering Tomorrow's Champions</span>
          <span class="hero-accent" data-i18n="hero.accent">with precision in every iteration.</span>
        </p>
        <div class="hero-actions reveal">
          <a href="#team" class="btn btn-primary" data-i18n="hero.meetTeam">Meet the Team</a>
          <a href="#car" class="btn btn-ghost" data-i18n="hero.viewCar">View Our Car</a>
        </div>
      </div>
      <a class="scroll-indicator" href="#event" data-i18n-aria="hero.scroll" aria-label="Scroll down">
        <span></span>
      </a>
    </section>

    <section class="section event-section" id="event">
      <div class="container">
        <span class="section-label reveal" data-i18n="event.label">ONLINE MEETING</span>
        <h2 class="section-title reveal" data-i18n="event.title">Meet Alexandr Artemyev</h2>
        <p class="event-intro reveal" data-i18n="event.subtitle">Le Mans 24 Hours driver · live with Ogma</p>
        <div class="event-poster reveal">
          <img
            class="event-poster-img"
            src="/images/event/artemyev-poster.png"
            data-i18n-alt="event.altPoster"
            alt="Ogma online meeting poster"
          />
        </div>
        <div class="event-meta reveal">
          <p class="event-date" data-i18n="event.date">25 May · 20:00</p>
          <p class="event-platform" data-i18n="event.platform">Google Meet</p>
          <a
            href="https://forms.gle/BaMo1rApvNb23b9v5"
            class="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            data-i18n="event.cta"
          >Join us</a>
        </div>
      </div>
    </section>

    <section class="section section-striped" id="about">
      <div class="container">
        <span class="section-label reveal" data-i18n="about.label">WHO WE ARE</span>
        <div class="about-grid">
          <div class="about-stats">
            <article class="stat-card reveal">
              <h3 data-count="2026" data-suffix="">0</h3>
              <p data-i18n="about.stat.year">Year Founded</p>
            </article>
            <article class="stat-card reveal">
              <h3 data-count="6" data-suffix="">0</h3>
              <p data-i18n="about.stat.members">Team Members</p>
            </article>
            <article class="stat-card reveal">
              <h3 data-count="2" data-suffix="">0</h3>
              <p data-i18n="about.stat.rounds">Competition Rounds</p>
            </article>
          </div>
          <article class="mission-panel reveal">
            <h2 data-i18n="about.mission.title">Precision, teamwork, and relentless iteration.</h2>
            <p data-i18n="about.mission.body">
              Ogma is a student STEM Racing team from NIS Almaty. We are the first school team in
              Kazakhstan's history to compete at Shell Eco-marathon.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" id="car">
      <div class="container">
        <span class="section-label reveal" data-i18n="car.label">THE MACHINE</span>
        <h2 class="section-title reveal" data-i18n="car.title">Our Car — CAD to Track</h2>
        <div class="car-layout">
          <article class="car-viewer-card reveal">
            <div class="car-viewer-body">
              <div class="car-viewer-mount" id="carViewerMount" data-i18n-aria="car.viewer.aria" aria-label="Interactive 3D model of the car"></div>
              <div class="car-viewer-chrome">
                <p class="car-viewer-status" id="carViewerStatus" data-i18n="car.viewer.loading">Loading 3D model…</p>
                <div class="car-viewer-actions">
                  <button type="button" class="car-viewer-btn is-active" id="carViewerAuto" aria-pressed="true" data-i18n="car.viewer.auto">
                    Auto spin
                  </button>
                  <button type="button" class="car-viewer-btn" id="carViewerReset" data-i18n="car.viewer.reset">Reset view</button>
                </div>
              </div>
            </div>
            <div class="car-feature-meta">
              <p data-i18n="car.meta.cad">Interactive CAD</p>
              <h3 data-i18n="car.meta.title">OGM-01 · STL viewer</h3>
            </div>
          </article>
          <div class="car-details">
            <article class="detail-card reveal">
              <div class="detail-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M3 16h18M5 16V8h14v8M8 8V6m8 2V6" stroke="currentColor" stroke-width="1.5"/></svg>
              </div>
              <h3 data-i18n="car.engine.title">Engine</h3>
              <p data-i18n="car.engine.body">Balanced output mapping tuned for sprint acceleration and reliability.</p>
            </article>
            <article class="detail-card reveal">
              <div class="detail-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M3 14h18l-2 4H5l-2-4Zm4 0V8h10v6" stroke="currentColor" stroke-width="1.5"/></svg>
              </div>
              <h3 data-i18n="car.chassis.title">Chassis</h3>
              <p data-i18n="car.chassis.body">Lightweight frame design with reinforced load zones for corner stability.</p>
            </article>
            <article class="detail-card reveal">
              <div class="detail-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M4 13c4 0 4-6 8-6s4 6 8 6M4 17h16" stroke="currentColor" stroke-width="1.5"/></svg>
              </div>
              <h3 data-i18n="car.aero.title">Aerodynamics</h3>
              <p data-i18n="car.aero.body">Refined flow channels minimizing drag while preserving high-speed control.</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-striped" id="team">
      <div class="container">
        <span class="section-label reveal" data-i18n="team.label">THE CREW</span>
        <h2 class="section-title reveal" data-i18n="team.title">Meet the Team Behind Ogma</h2>
        <div class="team-grid">
          ${teamMembers
            .map(
              (member) => `
                <article class="team-card reveal">
                  <div class="team-image-wrap">
                    <img src="${member.image}" alt="${member.name}" />
                    <div class="team-overlay">
                      <p data-i18n="${member.bioKey}"></p>
                      <a href="${member.social}" aria-label="Learn more about ${member.name}" data-i18n="team.learnMore">→ Learn more</a>
                    </div>
                  </div>
                  <div class="team-body">
                    <h3>${member.name}</h3>
                    <span class="role-pill" data-i18n="${member.roleKey}"></span>
                  </div>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="section achievements" id="achievements">
      <div class="container">
        <div class="achievement-grid">
          <article class="achievement-card reveal">
            <h3 data-count="1" data-i18n-suffix="ach.suffix.first" data-suffix="st">0</h3>
            <p data-i18n="ach.build">Build Season</p>
          </article>
          <article class="achievement-card reveal">
            <h3 data-count="6" data-suffix="">0</h3>
            <p data-i18n="ach.engineers">Engineers</p>
          </article>
          <article class="achievement-card reveal">
            <h3 data-count="3" data-suffix="">0</h3>
            <p data-i18n="ach.subsystems">Subsystems</p>
          </article>
          <article class="achievement-card reveal">
            <h3 data-count="100" data-suffix="%">0</h3>
            <p data-i18n="ach.ambition">Ambition</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-striped" id="pit-memory">
      <div class="container">
        <span class="section-label reveal" data-i18n="memory.label">PIT LANE TRAINING</span>
        <h2 class="section-title reveal" data-i18n="memory.title">Pit Stop Memory</h2>
        <p class="memory-intro reveal" data-i18n="memory.intro">
          Match pairs of tyres, tools, and engine parts — no timer, just calm focus like in the garage.
        </p>
        <div class="memory-mount reveal" id="pitMemoryMount"></div>
      </div>
    </section>

    <section class="section" id="find-fault">
      <div class="container">
        <span class="section-label reveal" data-i18n="fault.label">VISUAL INSPECTION</span>
        <h2 class="section-title reveal" data-i18n="fault.title">Find the Car Fault</h2>
        <p class="fault-intro reveal" data-i18n="fault.intro">
          Spot what is wrong on the car or in the garage — tap the problem. No timer, one level at a time.
        </p>
        <div class="fault-mount reveal" id="findFaultMount"></div>
      </div>
    </section>

    <section class="section section-striped" id="pit-timer">
      <div class="container">
        <span class="section-label reveal" data-i18n="timer.label">PIT STOP CLOCK</span>
        <h2 class="section-title reveal" data-i18n="timer.title">Session Timer</h2>
        <p class="pit-timer-intro reveal" data-i18n="timer.intro">
          Practice your reaction like race control — start when you are ready, reset for another run.
        </p>
        <div class="pit-timer-mount reveal" id="pitTimerMount"></div>
      </div>
    </section>

    <section class="section" id="gallery">
      <div class="container">
        <span class="section-label reveal" data-i18n="gallery.label">BEHIND THE BUILD</span>
        <h2 class="section-title reveal" data-i18n="gallery.title">Gallery</h2>
        <div class="gallery-grid">
          ${galleryImages
            .map(
              (src, index) => `
                <button class="gallery-item reveal" data-image="${src}" data-gallery-index="${index + 1}">
                  <img src="${src}" alt="Ogma build moment ${index + 1}" />
                  <span class="gallery-tint"></span>
                </button>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="section section-striped" id="socials">
      <div class="container">
        <span class="section-label reveal" data-i18n="social.label">FOLLOW THE JOURNEY</span>
        <h2 class="section-title reveal" data-i18n="social.title">Connect with Ogma</h2>
        <div class="social-grid">
          <a
            href="https://www.instagram.com/ogma_racing?igsh=MXc0dmtyYXk3Z3BsMQ=="
            class="social-card reveal instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Instagram</h3>
            <p>@ogma_racing</p>
            <span data-i18n="social.ig">Daily build logs</span>
          </a>
          <a
            href="https://youtube.com/@nastelly?si=_IRoDnd9W-titT06"
            class="social-card reveal youtube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>YouTube</h3>
            <p>@nastelly</p>
            <span data-i18n="social.yt">Tech deep dives</span>
          </a>
          <article class="social-card reveal linkedin">
            <h3>LinkedIn</h3>
            <p>Ogma STEM Racing</p>
            <span data-i18n="social.li">Partnership updates</span>
          </article>
        </div>
        <a
          href="https://www.instagram.com/ogma_racing?igsh=MXc0dmtyYXk3Z3BsMQ=="
          class="btn btn-primary social-cta reveal"
          target="_blank"
          rel="noopener noreferrer"
          data-i18n="social.follow"
        >Follow Us</a>
      </div>
    </section>

    <section class="section sponsors" id="sponsors">
      <div class="container">
        <span class="section-label reveal" data-i18n="sponsors.label">OUR PARTNERS</span>
        <div class="sponsor-row">
          <span class="sponsor-pill reveal">ED4U</span>
          <span class="sponsor-pill reveal">GIRLS GO FIRST</span>
          <span class="sponsor-pill reveal">YURT Space</span>
          <span class="sponsor-pill reveal">StemTrades</span>
        </div>
        <a href="#" class="btn btn-ghost reveal" data-i18n="sponsors.cta">Become a Sponsor</a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <a href="#hero" class="brand footer-brand">
          <img class="brand-logo" src="/images/ogma-logo.png" alt="OGMA" />
        </a>
        <p data-i18n="footer.tagline">Technical precision meets creative ambition.</p>
      </div>
      <div class="footer-links">
        <a href="#event" data-i18n="nav.event">Event</a>
        <a href="#about" data-i18n="nav.about">About</a>
        <a href="#team" data-i18n="nav.team">Team</a>
        <a href="#car" data-i18n="nav.car">Car</a>
        <a href="#pit-memory" data-i18n="nav.pitMemory">Pit Memory</a>
        <a href="#find-fault" data-i18n="nav.findFault">Find Fault</a>
        <a href="#pit-timer" data-i18n="nav.pitTimer">Pit Timer</a>
        <a href="#gallery" data-i18n="nav.gallery">Gallery</a>
      </div>
      <p class="footer-copy" data-i18n="footer.copy">Ogma Racing Team © 2026 · Built with passion</p>
    </div>
  </footer>

  <div class="lightbox" id="lightbox" aria-hidden="true">
    <button class="lightbox-close" id="lightboxClose" data-i18n-aria="lightbox.close" aria-label="Close image">&times;</button>
    <img id="lightboxImage" src="" alt="" />
    <p id="lightboxCaption"></p>
  </div>
`

const navbar = document.getElementById('navbar')
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')
const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
const counterItems = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'))
const carViewerMount = document.getElementById('carViewerMount')
const carViewerAuto = document.getElementById('carViewerAuto') as HTMLButtonElement | null
const carViewerReset = document.getElementById('carViewerReset') as HTMLButtonElement | null
const carViewerStatus = document.getElementById('carViewerStatus')
const pitMemoryMount = document.getElementById('pitMemoryMount')
const findFaultMount = document.getElementById('findFaultMount')
const pitTimerMount = document.getElementById('pitTimerMount')
const lightbox = document.getElementById('lightbox')
const lightboxImage = document.getElementById('lightboxImage') as HTMLImageElement | null
const lightboxCaption = document.getElementById('lightboxCaption')
const lightboxClose = document.getElementById('lightboxClose')

initI18n()

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)

const animateCounter = (element: HTMLElement) => {
  if (element.dataset.animated === 'true') return
  element.dataset.animated = 'true'

  const target = Number(element.dataset.count ?? 0)
  const suffix = element.dataset.suffix ?? ''
  const duration = 1000
  let start: number | null = null

  const update = (timestamp: number) => {
    if (start === null) {
      start = timestamp
    }
    const progress = Math.min((timestamp - start) / duration, 1)
    const eased = easeOutCubic(progress)
    const current = Math.floor(target * eased)
    element.textContent = `${current}${suffix}`
    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = `${target}${suffix}`
    }
  }

  requestAnimationFrame(update)
}

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
  { threshold: 0.2 },
)

revealItems.forEach((item) => revealObserver.observe(item))

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      animateCounter(entry.target as HTMLElement)
      countObserver.unobserve(entry.target)
    })
  },
  { threshold: 0.35 },
)

counterItems.forEach((counter) => countObserver.observe(counter))

window.addEventListener('scroll', () => {
  if (!navbar) return
  navbar.classList.toggle('scrolled', window.scrollY > 30)
})

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open')
  })
}

if (carViewerMount) {
  void import('./carViewer.ts').then(({ initCarViewer }) => {
    initCarViewer({
      mount: carViewerMount,
      autoRotateButton: carViewerAuto,
      resetButton: carViewerReset,
      statusEl: carViewerStatus,
    })
  })
}

if (pitMemoryMount) {
  void import('./pitStopMemory.ts').then(({ initPitStopMemory }) => {
    initPitStopMemory({ mount: pitMemoryMount })
  })
}

if (findFaultMount) {
  void import('./findFault.ts').then(({ initFindFault }) => {
    initFindFault({ mount: findFaultMount })
  })
}

if (pitTimerMount) {
  void import('./pitTimer.ts').then(({ initPitTimer }) => {
    initPitTimer({ mount: pitTimerMount })
  })
}

const closeLightbox = () => {
  if (!lightbox) return
  lightbox.classList.remove('open')
  lightbox.setAttribute('aria-hidden', 'true')
}

document.querySelectorAll<HTMLButtonElement>('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return
    const src = item.dataset.image ?? ''
    const index = item.dataset.galleryIndex ?? '1'
    const caption = t('gallery.moment', { n: index })
    lightboxImage.src = src
    lightboxImage.alt = caption
    lightboxCaption.textContent = caption
    lightbox.classList.add('open')
    lightbox.setAttribute('aria-hidden', 'false')
  })
})

lightboxClose?.addEventListener('click', closeLightbox)
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox()
  }
})
