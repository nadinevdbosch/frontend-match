//script voor hamburgermenu
const hamburger = document.querySelector('.hamburger');
const cross = document.querySelector('.cross');
const navigatie = document.querySelector('nav');

function active() {
    navigatie.classList.toggle('menu-items-active');
    hamburger.classList.toggle('display-none');
    cross.classList.toggle('display-none');
}

hamburger.addEventListener('click', active);
cross.addEventListener('click', active);
