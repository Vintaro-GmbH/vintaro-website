// ========================================
// DARK MODE FUNKTIONALITÄT
// ========================================

// Dark Mode initialisieren
function initTheme() {
    // Gespeicherte Präferenz aus localStorage laden
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Theme setzen: Gespeichert > System > Light
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        // Kein explizites Attribut = folgt System-Präferenz automatisch via CSS
        // Keine Aktion nötig, CSS @media (prefers-color-scheme) übernimmt
    } else {
        // Light Mode als Fallback
        document.documentElement.setAttribute('data-theme', 'light');
    }

    updateThemeIcon();
}

// Theme wechseln
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let newTheme;

    if (!currentTheme) {
        // Kein Theme gesetzt = folgt System
        newTheme = prefersDark ? 'light' : 'dark';
    } else if (currentTheme === 'light') {
        newTheme = 'dark';
    } else {
        newTheme = 'light';
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();

    // Feedback für Screenreader
    announceThemeChange(newTheme);
}

// Icon aktualisieren
function updateThemeIcon() {
    const theme = document.documentElement.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isEnglish = document.documentElement.lang === 'en';

    // Bestimme aktuelles effektives Theme
    const effectiveTheme = theme || (prefersDark ? 'dark' : 'light');

    // Aria-Label aktualisieren
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
        const label = effectiveTheme === 'dark'
            ? (isEnglish ? 'Switch to light mode' : 'Zu hellem Modus wechseln')
            : (isEnglish ? 'Switch to dark mode' : 'Zu dunklem Modus wechseln');
        toggleButton.setAttribute('aria-label', label);
    }
}

// Screenreader-Ankündigung
function announceThemeChange(theme) {
    const isEnglish = document.documentElement.lang === 'en';
    const message = theme === 'dark'
        ? (isEnglish ? 'Dark mode activated' : 'Dunkler Modus aktiviert')
        : (isEnglish ? 'Light mode activated' : 'Heller Modus aktiviert');

    // Erstelle Live-Region für Screenreader
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Nach 3 Sekunden entfernen
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

// System-Theme-Änderungen überwachen
function watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', (e) => {
        // Nur reagieren, wenn kein manuelles Theme gesetzt wurde
        if (!localStorage.getItem('theme')) {
            updateThemeIcon();
        }
    });
}

// ========================================
// MOBILE MENU & NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Theme initialisieren
    initTheme();
    watchSystemTheme();

    // Toggle Button Event
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        // Determine if we're on English or German page
        const isEnglish = document.documentElement.lang === 'en';
        const openText = isEnglish ? 'Open menu' : 'Menü öffnen';
        const closeText = isEnglish ? 'Close menu' : 'Menü schließen';

        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

            menuToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');

            // Update aria-label
            menuToggle.setAttribute('aria-label', isExpanded ? openText : closeText);
        });

        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', openText);
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const isClickInside = nav.contains(e.target) || menuToggle.contains(e.target);
                if (!isClickInside && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', openText);
                }
            }
        });
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
