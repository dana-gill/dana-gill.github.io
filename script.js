const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px 200px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
  const h1Elements = document.querySelectorAll('h1');
  h1Elements.forEach((el) => observer.observe(el));
  
  const h2Elements = document.querySelectorAll('h2');
  h2Elements.forEach((el) => observer.observe(el));
  
  const h3Elements = document.querySelectorAll('h3');
  h3Elements.forEach((el) => observer.observe(el));
  
  const h4Elements = document.querySelectorAll('h4');
  h4Elements.forEach((el) => observer.observe(el));
  
  const pElements = document.querySelectorAll('p');
  pElements.forEach((el) => observer.observe(el));
  
  const highlightElements = document.querySelectorAll('.highlight');
  highlightElements.forEach((el) => observer.observe(el));
});