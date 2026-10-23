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
