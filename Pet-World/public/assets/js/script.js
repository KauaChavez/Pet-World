document.addEventListener('DOMContentLoaded', function () {
  function menuHamburguer() {
    const hamburguer = document.querySelector('.hamburguer');
    const asideNavigation = document.querySelector('.aside-navigation');
    const overlow = document.querySelector('.overlow');
    const bodyOverflow = document.querySelector('body');

    hamburguer.addEventListener('click', () => {
      overlow.classList.toggle('active');
      bodyOverflow.classList.toggle('active');
      asideNavigation.classList.toggle('active');
    });

    overlow.addEventListener('click', () => {
      overlow.classList.remove('active');
      bodyOverflow.classList.remove('active');
      asideNavigation.classList.remove('active');
    });
  }
  menuHamburguer();

  function asideCart() {
    const cart = document.querySelector('.shop');
    const asideCart = document.querySelector('.aside-cart');
    const overlow = document.querySelector('.overlow');
    const bodyOverflow = document.querySelector('body');

    cart.addEventListener('click', () => {
      overlow.classList.toggle('active');
      bodyOverflow.classList.toggle('active');
      asideCart.classList.toggle('active');
    });

    overlow.addEventListener('click', () => {
      asideCart.classList.remove('active');
    });
  }
  asideCart();
});
