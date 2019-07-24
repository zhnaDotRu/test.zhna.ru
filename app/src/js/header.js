let eNav = document.querySelector('.js-open-menu');
document.querySelector('.js-btn-open-menu').addEventListener('click', function() {
  this.classList.toggle('is-open');
  eNav.classList.toggle('is-open');
}, false);