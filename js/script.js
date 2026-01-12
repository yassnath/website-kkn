// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

const navLinks = document.querySelectorAll('.navbar-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navbarNav.classList.remove('active');
  });
});

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};
const closeCartButton = document.querySelector('#close-cart-button');
if (closeCartButton) {
  closeCartButton.onclick = (e) => {
    shoppingCart.classList.remove('active');
    e.preventDefault();
  };
}

// Klik di luar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};

const cartButton = document.querySelector('#shopping-cart-button');
const productCartButtons = document.querySelectorAll('.product-cart-button');

const triggerCartPop = () => {
  if (!cartButton) {
    return;
  }
  cartButton.classList.remove('cart-pop');
  // Force reflow to restart animation.
  void cartButton.offsetWidth;
  cartButton.classList.add('cart-pop');
  window.setTimeout(() => {
    cartButton.classList.remove('cart-pop');
  }, 400);
};

const flyToCart = (sourceEl) => {
  if (!cartButton || !sourceEl) {
    return;
  }
  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = cartButton.getBoundingClientRect();
  const size = Math.min(sourceRect.width, sourceRect.height, 80);
  const startX = sourceRect.left + (sourceRect.width - size) / 2;
  const startY = sourceRect.top + (sourceRect.height - size) / 2;
  const endX = targetRect.left + targetRect.width / 2 - size / 2;
  const endY = targetRect.top + targetRect.height / 2 - size / 2;

  const flyer = sourceEl.cloneNode(true);
  flyer.classList.add('cart-flyer');
  flyer.style.width = `${size}px`;
  flyer.style.height = `${size}px`;
  flyer.style.left = `${startX}px`;
  flyer.style.top = `${startY}px`;
  flyer.style.opacity = '1';
  flyer.style.transform = 'translate(0, 0) scale(1)';
  document.body.appendChild(flyer);

  window.requestAnimationFrame(() => {
    flyer.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.2)`;
    flyer.style.opacity = '0.1';
  });

  window.setTimeout(() => {
    flyer.remove();
  }, 700);
};

productCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const image = card ? card.querySelector('.product-image img') : null;
    flyToCart(image || button);
    triggerCartPop();
  });
});

const revealItems = document.querySelectorAll('.reveal-onload');
revealItems.forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${index * 0.08}s`);
});

window.requestAnimationFrame(() => {
  revealItems.forEach((item) => item.classList.add('is-loaded'));
});
