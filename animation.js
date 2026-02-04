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
document.addEventListener('DOMContentLoaded', () => {
    const isSmallScreen = window.outerWidth <= 768;
    if (isSmallScreen) {
        applyMobileAnimation();
        return;
    }
    applyDesktopAnimation();
});
