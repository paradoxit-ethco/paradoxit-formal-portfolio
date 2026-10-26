const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeLabel = document.querySelector('.theme-label');
const storedTheme = localStorage.getItem('paradoxit-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(isDark, persist = true) {
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  if (themeIcon) themeIcon.textContent = isDark ? '☀' : '☾';
  if (themeLabel) themeLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#171717' : '#f7f4ee');
  if (persist) localStorage.setItem('paradoxit-theme', isDark ? 'dark' : 'light');
}

setTheme(storedTheme ? storedTheme === 'dark' : prefersDark, false);
themeToggle?.addEventListener('click', () => setTheme(!document.body.classList.contains('dark-mode')));

const languageToggle = document.querySelector('.language-toggle');
const languageStrings = {
  en: {
    navAbout: 'About Me', navSkills: 'Skills', navProjects: 'Projects', navContact: 'Contact',
    eyebrow: 'Software Developer', heroTitle: 'Building digital<br><span>experiences</span> through code.',
    heroDescription: "I'm Paradoxit, a software developer passionate about technology, creative problem-solving, and building modern digital experiences.",
    explore: 'Explore my projects <span>↗</span>', connect: "Let's connect <span>→</span>",
    aboutKicker: '01 / About me', aboutTitle: 'Curiosity is my<br /><i>starting point.</i>',
    skillsKicker: '02 / Capabilities', projectsKicker: '03 / Projects from GitHub',
    repoTitle: 'My work,<br /><i>in public.</i>',
    contactKicker: '04 / Start a conversation', contactTitle: 'Have a project<br /><i>in mind?</i>',
    contactDescription: "Have a project in mind, a collaboration opportunity, or simply want to connect? Let's build something great together.",
    footerTagline: 'Software developer<br />building with intention.'
  },
  am: {
    navAbout: 'ስለ እኔ', navSkills: 'ክህሎቶች', navProjects: 'ፕሮጀክቶች', navContact: 'ያግኙኝ',
    eyebrow: 'የሶፍትዌር ገንቢ', heroTitle: 'ዲጂታል<br><span>ተሞክሮዎችን</span> በኮድ መገንባት።',
    heroDescription: 'እኔ Paradoxit ነኝ፤ ለቴክኖሎጂ፣ ለፈጠራ ችግር መፍትሄ እና ለዘመናዊ ዲጂታል ተሞክሮዎች ፍቅር ያለኝ የሶፍትዌር ገንቢ ነኝ።',
    explore: 'ፕሮጀክቶቼን ይመልከቱ <span>↗</span>', connect: 'እንገናኝ <span>→</span>',
    aboutKicker: '01 / ስለ እኔ', aboutTitle: 'ጉጉት የእኔ<br /><i>መነሻ ነው።</i>',
    skillsKicker: '02 / ክህሎቶች', projectsKicker: '03 / ከ GitHub ፕሮጀክቶች',
    repoTitle: 'ስራዬ፣<br /><i>በግልጽ።</i>',
    contactKicker: '04 / ውይይት እንጀምር', contactTitle: 'ፕሮጀክት<br /><i>አለዎት?</i>',
    contactDescription: 'ፕሮጀክት፣ የትብብር እድል ወይም በቀላሉ ለመገናኘት ፈልገዋል? አንድ ላይ ታላቅ ነገር እንገንባ።',
    footerTagline: 'የሶፍትዌር ገንቢ<br />በዓላማ የሚገነባ።'
  }
};

function setLanguage(language, persist = true) {
  const t = languageStrings[language];
  const values = {
    '.nav-links a[href="#about"]': t.navAbout,
    '.nav-links a[href="#skills"]': t.navSkills,
    '.nav-links a[href="#projects"]': t.navProjects,
    '.nav-links a[href="#contact"]': t.navContact,
    '.hero .eyebrow': t.eyebrow,
    '.hero h1': t.heroTitle,
    '.hero-description': t.heroDescription,
    '.hero .button-dark': t.explore,
    '.hero .text-link': t.connect,
    '.about-section .section-kicker': t.aboutKicker,
    '.about-section h2': t.aboutTitle,
    '.section-tinted .section-kicker': t.projectsKicker,
    '.repo-directory h2': t.repoTitle,
    '.contact-section .section-kicker': t.contactKicker,
    '.contact-section h2': t.contactTitle,
    '.contact-grid>div>p': t.contactDescription,
    '.footer-top p': t.footerTagline
  };
  Object.entries(values).forEach(([selector, value]) => {
    const node = document.querySelector(selector);
    if (node) node.innerHTML = value;
  });
  document.documentElement.lang = language === 'am' ? 'am' : 'en';
  languageToggle?.setAttribute('aria-pressed', String(language === 'am'));
  languageToggle?.setAttribute('aria-label', language === 'am' ? 'Switch to English' : 'Switch to Amharic');
  if (persist) localStorage.setItem('paradoxit-language', language);
}

setLanguage(localStorage.getItem('paradoxit-language') || 'en', false);
languageToggle?.addEventListener('click', () => setLanguage(document.documentElement.lang === 'am' ? 'en' : 'am'));

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card[data-category]');
const filterEmpty = document.querySelector('.filter-empty');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount += 1;
    });
    if (filterEmpty) filterEmpty.hidden = visibleCount > 0;
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name').trim();
  const email = data.get('email').trim();
  const message = data.get('message').trim();

  if (!name || !email || !message) {
    status.textContent = 'Please complete all fields before sending.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    return;
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
  status.textContent = 'Your email app is opening with the message prepared.';
});
