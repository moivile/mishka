// Initialize contacts block
var contactsBlock = document.querySelector(".contacts");
if (contactsBlock) {
  contactsBlock.classList.remove("contacts--nojs");
}


// Initialize main-nav block
var navMainBlock = document.querySelector(".main-nav");
navMainBlock.classList.remove("main-nav--nojs");

var navToggleElem = document.querySelector(".main-nav__menu-toggle");



if (!navMainBlock.classList.contains("main-nav--closed") && !navMainBlock.classList.contains("main-nav--opened")) {
  navMainBlock.classList.add("main-nav--closed");
}

navToggleElem.addEventListener("click", function () {
  if (navMainBlock.classList.contains("main-nav--closed")) {
    navMainBlock.classList.remove("main-nav--closed");
    navMainBlock.classList.add("main-nav--opened");
  } else {
    navMainBlock.classList.add("main-nav--closed");
    navMainBlock.classList.remove("main-nav--opened");
  }
});

// Initialize modal-add-to-basket block
var weekProductOrderButton = document.querySelector(".week-product__order-button");
var productCardOrderButtons = document.querySelectorAll(".product-card__order-button");
var modalAddToBasketOverlay = document.querySelector(".modal-overlay");
var modalAddToBasket = document.querySelector(".modal-add-to-basket");
var form = document.querySelector(".modal-add-to-basket__form");



if (weekProductOrderButton) weekProductOrderButton.addEventListener("click", showModalAddToBasket);

for (var i = 0; i < productCardOrderButtons.length; i++) {
  productCardOrderButtons[i].addEventListener('click', showModalAddToBasket);
}


if (modalAddToBasketOverlay) modalAddToBasketOverlay.addEventListener("click", closeModalAddToBasket);

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modalAddToBasket.classList.contains("modal--show")) closeModalAddToBasket();
  }
});

function showModalAddToBasket(evt) {
  evt.preventDefault();
  modalAddToBasket.classList.add("modal--show");
  modalAddToBasketOverlay.classList.add("modal-overlay--show");
}

function closeModalAddToBasket() {
  form.reset();
  modalAddToBasket.classList.remove("modal--show");
  modalAddToBasketOverlay.classList.remove("modal-overlay--show");
}
