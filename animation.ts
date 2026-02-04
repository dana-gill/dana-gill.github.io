const observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px 100px 0px'
});

const applyMobileAnimation = (): void => {
  const allElements: NodeListOf<Element> = document.querySelectorAll('h1, h2, h3, h4, p, .highlight');
  allElements.forEach((el: Element) => el.classList.add('mobile-animation'));
  allElements.forEach((el: Element) => el.classList.add('animate'));
};

const applyDesktopAnimation = (): void => {
  const allElements: NodeListOf<Element> = document.querySelectorAll('h1, h2, h3, h4, p, .highlight');
  allElements.forEach((el: Element) => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', (): void => {
  const isSmallScreen: boolean = window.outerWidth <= 768;

  if (isSmallScreen) {
    applyMobileAnimation();
    return;
  }

  applyDesktopAnimation();
});
