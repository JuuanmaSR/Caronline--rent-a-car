// mobile menu
const burgerIcon = document.querySelector('#burger');
const navBarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
  burgerIcon.classList.toggle('is-active');
  navBarMenu.classList.toggle('is-active');
});
