import './style.css'

type PointerEventWithCurrentTarget = MouseEvent & { currentTarget: HTMLElement }

const teamMembers = [
  {
    name: 'Arystanbek Adilzhan',
    role: 'Cap',
    bio: 'Coordinates subsystems and keeps design, build, and strategy in lockstep.',
    image: 'https://placehold.co/640x760/0b1524/ffc828?text=Arystanbek',
    social: '#',
  },
  {
    name: 'Aimuratov Azamat',
    role: 'Aerodynamics',
    bio: 'Optimizes drag profile and airflow channels for higher straight-line speed.',
    image: 'https://placehold.co/640x760/0b1524/ffc828?text=Azamat',
    social: '#',
  },
  {
    name: 'Tsoy Anastasiya',
    role: 'Manufacturing',
    bio: 'Turns CAD precision into real components with strict tolerances.',
    image: 'https://placehold.co/640x760/0b1524/ffc828?text=Anastasiya',
    social: '#',
  },
  {
    name: 'Mukan Ibrahim',
    role: 'Powertrain',
    bio: 'Leads engine subsystem development and performance validation.',
    image: 'https://placehold.co/640x760/0b1524/ffc828?text=Ibrahim',
    social: '#',
  },
  {
    name: 'Fazylov Damir',
    role: 'Data & Telemetry',
    bio: 'Builds race-day dashboards and extracts actionable setup insights.',
    image: 'https://placehold.co/640x760/0b1524/ffc828?text=Damir',
    social: '#',
  },
  {
    name: 'Abdilda Zhasmin',
    role: 'Brand & Outreach',
    bio: 'Drives storytelling, sponsorship communication, and media presence.',
    image: 'https://placehold.co/640x760/0b1524/ffc828?text=Zhasmin',
    social: '#',
  },
]

const galleryImages = [
  'https://placehold.co/900x700/0b1524/ffc828?text=Workshop+Night',
  'https://placehold.co/900x540/0b1524/ffc828?text=CAD+Iteration',
  'https://placehold.co/900x780/0b1524/ffc828?text=Chassis+Assembly',
  'https://placehold.co/900x620/0b1524/ffc828?text=Pit+Preparation',
  'https://placehold.co/900x720/0b1524/ffc828?text=Team+Review',
  'https://placehold.co/900x560/0b1524/ffc828?text=Race+Simulation',
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
        <span class="brand-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M13 2 6 13h5l-1 9 8-12h-5l0-8Z" stroke="currentColor" stroke-width="1.6" />
          </svg>
        </span>
        <span>OGMA</span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" id="navLinks">
        <a href="#about">About</a>
        <a href="#team">Team</a>
        <a href="#car">Car</a>
        <a href="#gallery">Gallery</a>
        <a href="#socials">Socials</a>
        <a href="#socials" class="btn btn-primary btn-sm">Join Our Journey</a>
      </div>
    </div>
  </nav>

  <main>
    <section class="hero-section" id="hero">
      <div class="container hero-content">
        <span class="section-badge reveal">
          <span class="badge-dot"></span>
          STEM Racing Competition 2026
        </span>
        <h1 class="hero-title">
          <span class="hero-white">OG</span><span class="hero-yellow">MA</span>
        </h1>
        <p class="hero-subtitle reveal">
          Engineering Tomorrow's Champions
          <span class="hero-accent">with precision in every iteration.</span>
        </p>
        <div class="hero-actions reveal">
          <a href="#team" class="btn btn-primary">Meet the Team</a>
          <a href="#car" class="btn btn-ghost">View Our Car</a>
        </div>
      </div>
      <a class="scroll-indicator" href="#about" aria-label="Scroll down">
        <span></span>
      </a>
    </section>

    <section class="section section-striped" id="about">
      <div class="container">
        <span class="section-label reveal">WHO WE ARE</span>
        <div class="about-grid">
          <div class="about-stats">
            <article class="stat-card reveal">
              <h3 data-count="2026" data-suffix="">0</h3>
              <p>Year Founded</p>
            </article>
            <article class="stat-card reveal">
              <h3 data-count="6" data-suffix="">0</h3>
              <p>Team Members</p>
            </article>
            <article class="stat-card reveal">
              <h3 data-count="2" data-suffix="">0</h3>
              <p>Competition Rounds</p>
            </article>
          </div>
          <article class="mission-panel reveal">
            <h2>Precision, teamwork, and relentless iteration.</h2>
            <p>
              Ogma is a student STEM Racing team building race-ready systems with startup-level speed.
              We combine engineering rigor, data-driven testing, and bold design thinking to deliver a
              machine that performs under pressure.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" id="car">
      <div class="container">
        <span class="section-label reveal">THE MACHINE</span>
        <h2 class="section-title reveal">Our Car — CAD to Track</h2>
        <div class="car-layout">
          <article class="car-feature reveal tilt-card" id="tiltCard">
            <img src="https://placehold.co/1200x700/0b1524/ffc828?text=OGMA+CAD+MODEL" alt="Ogma CAD model render" />
            <div class="car-feature-meta">
              <p>Primary Render</p>
              <h3>OGM-01 Prototype</h3>
            </div>
          </article>
          <div class="car-details">
            <article class="detail-card reveal">
              <div class="detail-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M3 16h18M5 16V8h14v8M8 8V6m8 2V6" stroke="currentColor" stroke-width="1.5"/></svg>
              </div>
              <h3>Engine</h3>
              <p>Balanced output mapping tuned for sprint acceleration and reliability.</p>
            </article>
            <article class="detail-card reveal">
              <div class="detail-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M3 14h18l-2 4H5l-2-4Zm4 0V8h10v6" stroke="currentColor" stroke-width="1.5"/></svg>
              </div>
              <h3>Chassis</h3>
              <p>Lightweight frame design with reinforced load zones for corner stability.</p>
            </article>
            <article class="detail-card reveal">
              <div class="detail-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M4 13c4 0 4-6 8-6s4 6 8 6M4 17h16" stroke="currentColor" stroke-width="1.5"/></svg>
              </div>
              <h3>Aerodynamics</h3>
              <p>Refined flow channels minimizing drag while preserving high-speed control.</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-striped" id="team">
      <div class="container">
        <span class="section-label reveal">THE CREW</span>
        <h2 class="section-title reveal">Meet the Team Behind Ogma</h2>
        <div class="team-grid">
          ${teamMembers
            .map(
              (member) => `
                <article class="team-card reveal">
                  <div class="team-image-wrap">
                    <img src="${member.image}" alt="${member.name}" />
                    <div class="team-overlay">
                      <p>${member.bio}</p>
                      <a href="${member.social}" aria-label="Learn more about ${member.name}">→ Learn more</a>
                    </div>
                  </div>
                  <div class="team-body">
                    <h3>${member.name}</h3>
                    <span class="role-pill">${member.role}</span>
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
            <h3 data-count="1" data-suffix="st">0</h3>
            <p>Build Season</p>
          </article>
          <article class="achievement-card reveal">
            <h3 data-count="6" data-suffix="">0</h3>
            <p>Engineers</p>
          </article>
          <article class="achievement-card reveal">
            <h3 data-count="3" data-suffix="">0</h3>
            <p>Subsystems</p>
          </article>
          <article class="achievement-card reveal">
            <h3 data-count="100" data-suffix="%">0</h3>
            <p>Ambition</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" id="gallery">
      <div class="container">
        <span class="section-label reveal">BEHIND THE BUILD</span>
        <h2 class="section-title reveal">Gallery</h2>
        <div class="gallery-grid">
          ${galleryImages
            .map(
              (src, index) => `
                <button class="gallery-item reveal" data-image="${src}" data-title="Build Moment ${index + 1}">
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
        <span class="section-label reveal">FOLLOW THE JOURNEY</span>
        <h2 class="section-title reveal">Connect with Ogma</h2>
        <div class="social-grid">
          <article class="social-card reveal instagram">
            <h3>Instagram</h3>
            <p>@ogma.racing</p>
            <span>Daily build logs</span>
          </article>
          <article class="social-card reveal youtube">
            <h3>YouTube</h3>
            <p>Ogma Racing Team</p>
            <span>Tech deep dives</span>
          </article>
          <article class="social-card reveal linkedin">
            <h3>LinkedIn</h3>
            <p>Ogma STEM Racing</p>
            <span>Partnership updates</span>
          </article>
        </div>
        <a href="#" class="btn btn-primary social-cta reveal">Follow Us</a>
      </div>
    </section>

    <section class="section sponsors" id="sponsors">
      <div class="container">
        <span class="section-label reveal">OUR PARTNERS</span>
        <div class="sponsor-row">
          <img class="reveal" src="https://placehold.co/220x90/0b1524/ffc828?text=Nova+Tech" alt="Nova Tech logo" />
          <img class="reveal" src="https://placehold.co/220x90/0b1524/ffc828?text=Aero+Lab" alt="Aero Lab logo" />
          <img class="reveal" src="https://placehold.co/220x90/0b1524/ffc828?text=Flux+Systems" alt="Flux Systems logo" />
          <img class="reveal" src="https://placehold.co/220x90/0b1524/ffc828?text=STEM+Hub" alt="STEM Hub logo" />
        </div>
        <a href="#" class="btn btn-ghost reveal">Become a Sponsor</a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <a href="#hero" class="brand footer-brand">
          <span class="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M13 2 6 13h5l-1 9 8-12h-5l0-8Z" stroke="currentColor" stroke-width="1.6" />
            </svg>
          </span>
          <span>OGMA</span>
        </a>
        <p>Technical precision meets creative ambition.</p>
      </div>
      <div class="footer-links">
        <a href="#about">About</a>
        <a href="#team">Team</a>
        <a href="#car">Car</a>
        <a href="#gallery">Gallery</a>
      </div>
      <p class="footer-copy">Ogma Racing Team © 2026 · Built with passion</p>
    </div>
  </footer>

  <div class="lightbox" id="lightbox" aria-hidden="true">
    <button class="lightbox-close" id="lightboxClose" aria-label="Close image">&times;</button>
    <img id="lightboxImage" src="" alt="" />
    <p id="lightboxCaption"></p>
  </div>
`

const navbar = document.getElementById('navbar')
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')
const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
const counterItems = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'))
const tiltCard = document.getElementById('tiltCard')
const lightbox = document.getElementById('lightbox')
const lightboxImage = document.getElementById('lightboxImage') as HTMLImageElement | null
const lightboxCaption = document.getElementById('lightboxCaption')
const lightboxClose = document.getElementById('lightboxClose')

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

if (tiltCard) {
  tiltCard.addEventListener('mousemove', (event) => {
    const e = event as PointerEventWithCurrentTarget
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    e.currentTarget.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`
  })
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = ''
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
    const caption = item.dataset.title ?? ''
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
