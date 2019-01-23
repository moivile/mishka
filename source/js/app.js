document.querySelector(".contacts").classList.remove("contacts--nojs");

var navMain = document.querySelector(".main-nav");
navMain.classList.remove("main-nav--nojs");

var navToggle = document.querySelector(".main-nav__menu-toggle");



if (!navMain.classList.contains("main-nav--closed") && !navMain.classList.contains("main-nav--opened")) {
  navMain.classList.add("main-nav--closed");
}

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});
