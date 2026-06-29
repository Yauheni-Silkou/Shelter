import { initBurger } from "./burger.js";
import { initPopupEngine } from "./popup.js";

document.addEventListener("DOMContentLoaded", async () => {
  initBurger();
  initPopupEngine();

  const carouselTrack = document.getElementById("slider-track");
  if (carouselTrack) {
    const { initCarousel } = await import("./carousel.js");
    initCarousel(carouselTrack);
  }

  const petsGrid = document.getElementById("pets-grid");
  if (petsGrid) {
    const { initPagination } = await import("./pagination.js");
    initPagination(petsGrid);
  }
});
