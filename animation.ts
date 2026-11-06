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

const setupNav = (): void => {
  const toggle: Element | null = document.querySelector('.nav-toggle');
  const overlay: Element | null = document.querySelector('.nav-overlay');
  const close: Element | null = document.querySelector('.nav-close');

  if (!toggle || !overlay || !close) {
    return;
  }

  const openNav = (): void => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = (): void => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', openNav);
  close.addEventListener('click', closeNav);

  document.addEventListener('keydown', (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      closeNav();
    }
  });
};

document.addEventListener('DOMContentLoaded', (): void => {
  setupNav();

  const isSmallScreen: boolean = window.outerWidth <= 768;

  if (isSmallScreen) {
    applyMobileAnimation();
    return;
  }

  applyDesktopAnimation();
});
