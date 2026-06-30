export function initBurger() {
  const navMenu = document.getElementById("nav-menu");
  const burgerToggle = document.getElementById("burger-toggle");
  const menuOverlay = document.getElementById("menu-overlay");
  const navLinks = document.querySelectorAll(".nav__link");

  if (!navMenu || !burgerToggle || !menuOverlay) return;

  function toggleMenu() {
    const isOpen = burgerToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
    menuOverlay.classList.toggle("open");

    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }

  function closeMenu() {
    burgerToggle.classList.remove("open");
    navMenu.classList.remove("open");
    menuOverlay.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  burgerToggle.addEventListener("click", toggleMenu);
  menuOverlay.addEventListener("click", closeMenu);
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}
