"use strict";
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px 100px 0px'
});
const applyMobileAnimation = () => {
    const allElements = document.querySelectorAll('h1, h2, h3, h4, p, .highlight');
    allElements.forEach((el) => el.classList.add('mobile-animation'));
    allElements.forEach((el) => el.classList.add('animate'));
};
const applyDesktopAnimation = () => {
    const allElements = document.querySelectorAll('h1, h2, h3, h4, p, .highlight');
    allElements.forEach((el) => observer.observe(el));
};
const setupNav = () => {
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.nav-overlay');
    const close = document.querySelector('.nav-close');
    if (!toggle || !overlay || !close) {
        return;
    }
    const openNav = () => {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    };
    const closeNav = () => {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    };
    toggle.addEventListener('click', openNav);
    close.addEventListener('click', closeNav);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && overlay.classList.contains('open')) {
            closeNav();
        }
    });
};
document.addEventListener('DOMContentLoaded', () => {
    setupNav();
    const isSmallScreen = window.outerWidth <= 768;
    if (isSmallScreen) {
        applyMobileAnimation();
        return;
    }
    applyDesktopAnimation();
});
