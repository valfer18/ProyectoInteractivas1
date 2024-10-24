document.addEventListener('DOMContentLoaded', (event) => {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.main-nav');

    burgerMenu.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  });