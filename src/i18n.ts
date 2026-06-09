export type Lang = 'en' | 'ru'

export const LANG_EVENT = 'ogma:lang'

const STORAGE_KEY = 'ogma-lang'

let currentLang: Lang = 'en'

const messages: Record<Lang, Record<string, string>> = {
  en: {
    'nav.toggle': 'Toggle navigation',
    'nav.journey': 'Journey',
    'nav.past': 'Past Events',
    'nav.about': 'About',
    'nav.team': 'Team',
    'nav.car': 'Car',
    'nav.pitMemory': 'Pit Memory',
    'nav.findFault': 'Find Fault',
    'nav.pitTimer': 'Pit Timer',
    'nav.gallery': 'Gallery',
    'nav.socials': 'Socials',
    'nav.join': 'Join Our Journey',
    'nav.lang': 'Language',
    'lang.en': 'EN',
    'lang.ru': 'RU',

    'hero.badge': 'Kazakhstan Racing · STEM 2026',
    'hero.subtitle': "Engineering Tomorrow's Champions",
    'hero.accent': 'with precision in every iteration.',
    'hero.meetTeam': 'Meet the Team',
    'hero.viewCar': 'View Our Car',
    'hero.scroll': 'Scroll down',

    'journey.label': 'OUR JOURNEY',
    'journey.title': 'National Champions 2026',
    'journey.intro':
      'From the workshop to the national podium — here is where Ogma stands today.',
    'journey.altTeam': 'The Ogma team together',
    'journey.altChamp': 'Ogma team celebrating the national championship',
    'journey.altNext': 'Ogma team ahead of the international stage',
    'journey.champ.tag': 'CHAMPIONS',
    'journey.champ.title': 'National STEM Racing 2026 — Kazakhstan',
    'journey.champ.body':
      'We won the national STEM Racing 2026 Kazakhstan championship — the result of a full season of design, building, testing, and teamwork.',
    'journey.next.tag': 'NEXT STAGE',
    'journey.next.title': 'International Final · Singapore',
    'journey.next.body':
      'As national champions, Ogma earned a place at the international STEM Racing final in Singapore, competing against the best school teams in the world.',
    'journey.next.dates': '2–8 October 2026 · Singapore',

    'past.label': 'PAST EVENTS',
    'past.title': "What We've Hosted",
    'past.completed': 'Completed',

    'event.title': 'Meet Alexandr Artemyev',
    'event.subtitle': 'Le Mans 24 Hours driver · live with Ogma',
    'event.date': '25 May · 20:00',
    'event.platform': 'Google Meet',
    'event.altPoster': 'Ogma online meeting poster with Alexandr Artemyev',

    'about.label': 'WHO WE ARE',
    'about.stat.year': 'Year Founded',
    'about.stat.members': 'Team Members',
    'about.stat.rounds': 'Competition Rounds',
    'about.mission.title': 'Precision, teamwork, and relentless iteration.',
    'about.mission.body':
      "Ogma is a student STEM Racing team from NIS Almaty. We are the first school team in Kazakhstan's history to compete at Shell Eco-marathon. We build race-ready systems with startup-level speed, combining engineering rigor, data-driven testing, and bold design to deliver a machine that performs under pressure.",

    'car.label': 'THE MACHINE',
    'car.title': 'Our Car — CAD to Track',
    'car.viewer.aria': 'Interactive 3D model of the car',
    'car.viewer.loading': 'Loading 3D model…',
    'car.viewer.ready': 'Drag to orbit · scroll to zoom · right-drag to pan',
    'car.viewer.error': 'Could not load the 3D model. Check that the file is in /public/models/.',
    'car.viewer.auto': 'Auto spin',
    'car.viewer.reset': 'Reset view',
    'car.meta.cad': 'Interactive CAD',
    'car.meta.title': 'OGM-01 · STL viewer',
    'car.engine.title': 'Engine',
    'car.engine.body': 'Balanced output mapping tuned for sprint acceleration and reliability.',
    'car.chassis.title': 'Chassis',
    'car.chassis.body': 'Lightweight frame design with reinforced load zones for corner stability.',
    'car.aero.title': 'Aerodynamics',
    'car.aero.body': 'Refined flow channels minimizing drag while preserving high-speed control.',

    'team.label': 'THE CREW',
    'team.title': 'Meet the Team Behind Ogma',
    'team.learnMore': '→ Learn more',
    'team.roles.cap': 'Cap',
    'team.roles.aero': 'Aerodynamics',
    'team.roles.mfg': 'Manufacturing',
    'team.roles.power': 'Powertrain',
    'team.roles.data': 'Data & Telemetry',
    'team.roles.brand': 'Brand & Outreach',
    'team.bios.arystanbek':
      'Coordinates subsystems and keeps design, build, and strategy in lockstep.',
    'team.bios.azamat': 'Optimizes drag profile and airflow channels for higher straight-line speed.',
    'team.bios.anastasiya': 'Turns CAD precision into real components with strict tolerances.',
    'team.bios.ibrahim': 'Leads engine subsystem development and performance validation.',
    'team.bios.damir': 'Builds race-day dashboards and extracts actionable setup insights.',
    'team.bios.zhasmin': 'Drives storytelling, sponsorship communication, and media presence.',

    'ach.build': 'Build Season',
    'ach.engineers': 'Engineers',
    'ach.subsystems': 'Subsystems',
    'ach.ambition': 'Ambition',
    'ach.suffix.first': 'st',

    'memory.label': 'PIT LANE TRAINING',
    'memory.title': 'Pit Stop Memory',
    'memory.intro':
      'Match pairs of tyres, tools, and engine parts — no timer, just calm focus like in the garage.',
    'memory.status': 'Find matching pairs in the pit lane.',
    'memory.restart': 'New grid',
    'memory.match': '{n} of {total} pairs secured.',
    'memory.complete': 'Pit stop complete — every pair matched.',
    'memory.noMatch': 'No match — try another pair.',
    'memory.cat.tires': 'Tyres',
    'memory.cat.tools': 'Tools',
    'memory.cat.engine': 'Engine',
    'memory.card.slick': 'Slick tyre',
    'memory.card.wet': 'Wet tyre',
    'memory.card.gun': 'Wheel gun',
    'memory.card.jack': 'Pit jack',
    'memory.card.piston': 'Piston',
    'memory.card.spark': 'Spark plug',

    'fault.label': 'VISUAL INSPECTION',
    'fault.title': 'Find the Car Fault',
    'fault.intro':
      'Spot what is wrong on the car or in the garage — tap the problem. No timer, one level at a time.',
    'fault.miss': 'Not that spot — keep inspecting the car and garage.',
    'fault.correct': 'Correct — {label}.',
    'fault.done': 'Inspection complete. You found every fault.',
    'fault.nextReady': 'Bay clear. Continue to the next level when ready.',
    'fault.found': 'Found {n} of {total}',
    'fault.prev': 'Previous',
    'fault.next': 'Next level',
    'fault.replay': 'Play again',
    'fault.l1.title': 'Level 1 · Pit lane',
    'fault.l1.hint': 'One wheel is missing. Tap where the fault is.',
    'fault.l1.zone': 'Missing front wheel',
    'fault.l2.title': 'Level 2 · Paint check',
    'fault.l2.hint': 'The car has the wrong team colours. Find the mistake.',
    'fault.l2.zone': 'Wrong body colour',
    'fault.l3.title': 'Level 3 · Garage floor',
    'fault.l3.hint': 'Something does not belong in the pit lane. Tap it.',
    'fault.l3.zone': 'Extra tool on the floor',
    'fault.l4.title': 'Level 4 · Aero inspection',
    'fault.l4.hint': 'Find the damaged part on the car.',
    'fault.l4.zone': 'Damaged rear wing',

    'timer.label': 'PIT STOP CLOCK',
    'timer.title': 'Session Timer',
    'timer.intro':
      'Practice your reaction like race control — start when you are ready, reset for another run.',
    'timer.badge': 'OGMA PIT',
    'timer.session': 'Session time',
    'timer.start': 'Start',
    'timer.pause': 'Pause',
    'timer.reset': 'Reset',

    'gallery.label': 'BEHIND THE BUILD',
    'gallery.title': 'Gallery',
    'gallery.moment': 'Build Moment {n}',

    'social.label': 'FOLLOW THE JOURNEY',
    'social.title': 'Connect with Ogma',
    'social.ig': 'Daily build logs',
    'social.yt': 'Tech deep dives',
    'social.li': 'Partnership updates',
    'social.follow': 'Follow Us',

    'sponsors.label': 'OUR PARTNERS',
    'sponsors.cta': 'Become a Sponsor',

    'footer.tagline': 'Technical precision meets creative ambition.',
    'footer.copy': 'Ogma Racing Team © 2026 · Built with passion',
    'lightbox.close': 'Close image',
  },
  ru: {
    'nav.toggle': 'Открыть меню',
    'nav.journey': 'Наш путь',
    'nav.past': 'Прошедшие',
    'nav.about': 'О нас',
    'nav.team': 'Команда',
    'nav.car': 'Болид',
    'nav.pitMemory': 'Пит-память',
    'nav.findFault': 'Найди поломку',
    'nav.pitTimer': 'Таймер',
    'nav.gallery': 'Галерея',
    'nav.socials': 'Соцсети',
    'nav.join': 'С нами',
    'nav.lang': 'Язык',
    'lang.en': 'EN',
    'lang.ru': 'RU',

    'hero.badge': 'Казахстан · STEM 2026',
    'hero.subtitle': 'Инженерия чемпионов завтрашнего дня',
    'hero.accent': 'с точностью в каждой итерации.',
    'hero.meetTeam': 'Познакомиться с командой',
    'hero.viewCar': 'Посмотреть болид',
    'hero.scroll': 'Прокрутить вниз',

    'journey.label': 'НАШ ПУТЬ',
    'journey.title': 'Чемпионы страны 2026',
    'journey.intro':
      'От мастерской до национального подиума — вот где Ogma находится сегодня.',
    'journey.altTeam': 'Команда Ogma вместе',
    'journey.altChamp': 'Команда Ogma на национальном чемпионате',
    'journey.altNext': 'Команда Ogma перед международным этапом',
    'journey.champ.tag': 'ЧЕМПИОНЫ',
    'journey.champ.title': 'Национальный STEM Racing 2026 — Казахстан',
    'journey.champ.body':
      'Мы выиграли национальный чемпионат STEM Racing 2026 в Казахстане — результат целого сезона проектирования, сборки, тестов и командной работы.',
    'journey.next.tag': 'СЛЕДУЮЩИЙ ЭТАП',
    'journey.next.title': 'Международный финал · Сингапур',
    'journey.next.body':
      'Как чемпионы страны, Ogma отобрана на международный финал STEM Racing в Сингапуре, где соревнуются лучшие школьные команды мира.',
    'journey.next.dates': '2–8 октября 2026 · Сингапур',

    'past.label': 'ПРОШЕДШИЕ МЕРОПРИЯТИЯ',
    'past.title': 'Что мы провели',
    'past.completed': 'Завершено',

    'event.title': 'Александр Артемьев',
    'event.subtitle': 'Гонщик Le Mans 24 Hours · встреча с Ogma',
    'event.date': '25 мая · 20:00',
    'event.platform': 'Google Meet',
    'event.altPoster': 'Анонс онлайн-встречи Ogma с Александром Артемьевым',

    'about.label': 'КТО МЫ',
    'about.stat.year': 'Год основания',
    'about.stat.members': 'Участников',
    'about.stat.rounds': 'Этапов соревнований',
    'about.mission.title': 'Точность, командная работа и постоянные улучшения.',
    'about.mission.body':
      'Ogma — школьная команда STEM Racing из НИШ Алматы. Мы первая школьная команда в истории Казахстана, принявшая участие в Shell Eco-marathon. Создаём гоночные системы в темпе стартапа: инженерная строгость, тесты на данных и смелый дизайн помогают болиду выдерживать давление трассы.',

    'car.label': 'БОЛИД',
    'car.title': 'Наш болид — от CAD до трассы',
    'car.viewer.aria': 'Интерактивная 3D-модель болида',
    'car.viewer.loading': 'Загрузка 3D-модели…',
    'car.viewer.ready': 'Тяните для поворота · колесо для масштаба · правая кнопка — панорама',
    'car.viewer.error': 'Не удалось загрузить 3D-модель. Проверьте файл в /public/models/.',
    'car.viewer.auto': 'Автоповорот',
    'car.viewer.reset': 'Сброс вида',
    'car.meta.cad': 'Интерактивный CAD',
    'car.meta.title': 'OGM-01 · STL-просмотр',
    'car.engine.title': 'Двигатель',
    'car.engine.body': 'Сбалансированная отдача для ускорения на спринте и надёжности.',
    'car.chassis.title': 'Шасси',
    'car.chassis.body': 'Лёгкая рама с усиленными зонами нагрузки для стабильности в поворотах.',
    'car.aero.title': 'Аэродинамика',
    'car.aero.body': 'Потоки с меньшим сопротивлением и контролем на высокой скорости.',

    'team.label': 'КОМАНДА',
    'team.title': 'Команда Ogma',
    'team.learnMore': '→ Подробнее',
    'team.roles.cap': 'Капитан',
    'team.roles.aero': 'Аэродинамика',
    'team.roles.mfg': 'Производство',
    'team.roles.power': 'Силовая установка',
    'team.roles.data': 'Данные и телеметрия',
    'team.roles.brand': 'Бренд и PR',
    'team.bios.arystanbek':
      'Координирует подсистемы и держит дизайн, сборку и стратегию в едином ритме.',
    'team.bios.azamat': 'Оптимизирует обтекание и воздушные каналы для скорости на прямой.',
    'team.bios.anastasiya': 'Переводит CAD в детали с точными допусками.',
    'team.bios.ibrahim': 'Руководит силовой установкой и проверкой характеристик.',
    'team.bios.damir': 'Собирает дашборды и выводит полезные данные с трассы.',
    'team.bios.zhasmin': 'Отвечает за историю бренда, спонсоров и медиа.',

    'ach.build': 'Сезон сборки',
    'ach.engineers': 'Инженеров',
    'ach.subsystems': 'Подсистем',
    'ach.ambition': 'Амбиции',
    'ach.suffix.first': '-й',

    'memory.label': 'ТРЕНИРОВКА ПИТ-ЛЕЙНА',
    'memory.title': 'Пит-стоп память',
    'memory.intro':
      'Найдите пары шин, инструментов и деталей двигателя — без таймера, в спокойном темпе, как в боксе.',
    'memory.status': 'Найдите пары в пит-лейне.',
    'memory.restart': 'Новая сетка',
    'memory.match': '{n} из {total} пар найдено.',
    'memory.complete': 'Пит-стоп завершён — все пары найдены.',
    'memory.noMatch': 'Не пара — попробуйте ещё.',
    'memory.cat.tires': 'Шины',
    'memory.cat.tools': 'Инструменты',
    'memory.cat.engine': 'Двигатель',
    'memory.card.slick': 'Слик',
    'memory.card.wet': 'Дождевые',
    'memory.card.gun': 'Пневмогайковёрт',
    'memory.card.jack': 'Домкрат',
    'memory.card.piston': 'Поршень',
    'memory.card.spark': 'Свеча',

    'fault.label': 'ВИЗУАЛЬНЫЙ ОСМОТР',
    'fault.title': 'Найди неисправность',
    'fault.intro':
      'Найдите, что не так на болиде или в гараже — нажмите на проблему. Без таймера, по одному уровню.',
    'fault.miss': 'Не здесь — осмотрите болид и гараж дальше.',
    'fault.correct': 'Верно — {label}.',
    'fault.done': 'Осмотр завершён — все неисправности найдены.',
    'fault.nextReady': 'Бокс чист. Переходите на следующий уровень, когда будете готовы.',
    'fault.found': 'Найдено {n} из {total}',
    'fault.prev': 'Назад',
    'fault.next': 'Следующий уровень',
    'fault.replay': 'Сначала',
    'fault.l1.title': 'Уровень 1 · Пит-лейн',
    'fault.l1.hint': 'Не хватает колеса. Нажмите на проблемное место.',
    'fault.l1.zone': 'Отсутствует переднее колесо',
    'fault.l2.title': 'Уровень 2 · Проверка ливреи',
    'fault.l2.hint': 'Неверные цвета команды. Найдите ошибку.',
    'fault.l2.zone': 'Неверный цвет кузова',
    'fault.l3.title': 'Уровень 3 · Пол гаража',
    'fault.l3.hint': 'Что-то лишнее в пит-лейне. Нажмите на это.',
    'fault.l3.zone': 'Лишний инструмент на полу',
    'fault.l4.title': 'Уровень 4 · Аэропакет',
    'fault.l4.hint': 'Найдите повреждённую деталь на болиде.',
    'fault.l4.zone': 'Повреждено заднее крыло',

    'timer.label': 'ЧАСЫ ПИТ-СТОПА',
    'timer.title': 'Таймер сессии',
    'timer.intro':
      'Тренируйте реакцию как у race control — старт, когда готовы, сброс для нового заезда.',
    'timer.badge': 'OGMA PIT',
    'timer.session': 'Время сессии',
    'timer.start': 'Старт',
    'timer.pause': 'Пауза',
    'timer.reset': 'Сброс',

    'gallery.label': 'ЗА КУЛИСАМИ',
    'gallery.title': 'Галерея',
    'gallery.moment': 'Момент сборки {n}',

    'social.label': 'СЛЕДИТЕ ЗА НАМИ',
    'social.title': 'Связь с Ogma',
    'social.ig': 'Ежедневные логи сборки',
    'social.yt': 'Технические разборы',
    'social.li': 'Новости для партнёров',
    'social.follow': 'Подписаться',

    'sponsors.label': 'ПАРТНЁРЫ',
    'sponsors.cta': 'Стать спонсором',

    'footer.tagline': 'Техническая точность и смелые амбиции.',
    'footer.copy': 'Ogma Racing Team © 2026 · Сделано с душой',
    'lightbox.close': 'Закрыть изображение',
  },
}

export function getLang(): Lang {
  return currentLang
}

export function t(key: string, vars?: Record<string, string | number>, lang: Lang = currentLang): string {
  const table = messages[lang]
  let text = table[key] ?? messages.en[key] ?? key
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value))
    }
  }
  return text
}

function applyToDom(lang: Lang) {
  document.documentElement.lang = lang === 'ru' ? 'ru' : 'en'

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n
    if (!key) return
    el.textContent = t(key, undefined, lang)
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml
    if (!key) return
    el.innerHTML = t(key, undefined, lang)
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder
    if (!key || !(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return
    el.placeholder = t(key, undefined, lang)
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria
    if (!key) return
    el.setAttribute('aria-label', t(key, undefined, lang))
  })

  document.querySelectorAll<HTMLImageElement>('[data-i18n-alt]').forEach((el) => {
    const key = el.dataset.i18nAlt
    if (!key) return
    el.alt = t(key, undefined, lang)
  })

  document.querySelectorAll<HTMLButtonElement>('.lang-switch-btn').forEach((btn) => {
    const isActive = btn.dataset.lang === lang
    btn.classList.toggle('is-active', isActive)
    btn.setAttribute('aria-pressed', String(isActive))
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-suffix]').forEach((el) => {
    const key = el.dataset.i18nSuffix
    if (!key) return
    el.dataset.suffix = t(key, undefined, lang)
    if (el.dataset.animated !== 'true') {
      const suffix = el.dataset.suffix ?? ''
      el.textContent = `0${suffix}`
    }
  })
}

export function setLang(lang: Lang) {
  currentLang = lang
  localStorage.setItem(STORAGE_KEY, lang)
  applyToDom(lang)
  window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: { lang } }))
}

export function initI18n() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'ru' || stored === 'en') {
    currentLang = stored
  }
  applyToDom(currentLang)

  document.querySelectorAll<HTMLButtonElement>('.lang-switch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang
      if (lang === 'en' || lang === 'ru') {
        setLang(lang)
      }
    })
  })
}

export function onLangChange(handler: (lang: Lang) => void): () => void {
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<{ lang: Lang }>).detail
    handler(detail?.lang ?? getLang())
  }
  window.addEventListener(LANG_EVENT, listener)
  return () => window.removeEventListener(LANG_EVENT, listener)
}
