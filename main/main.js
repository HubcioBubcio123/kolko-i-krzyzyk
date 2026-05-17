document.querySelectorAll('.karta').forEach(karta => {
  karta.addEventListener('mouseenter', () => {
    document.body.classList.add('karta-hover');
  });
  karta.addEventListener('mouseleave', () => {
    document.body.classList.remove('karta-hover');
  });
});