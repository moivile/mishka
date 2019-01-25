const contactsBlock = document.querySelector(".contacts");
if (contactsBlock) {
  contactsBlock.classList.remove("contacts--nojs");
}
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
