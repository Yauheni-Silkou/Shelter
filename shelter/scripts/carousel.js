import { fetchPetsData } from "./api.js";
import { getNextCarouselGroup, createCardHTML } from "./utils.js";

export async function initCarousel(track) {
  const btnLeft = document.getElementById("slider-arrow-left");
  const btnRight = document.getElementById("slider-arrow-right");
  if (!btnLeft || !btnRight || !track) return;

  let allPets = [];
  let currentGroup = [];

  let renderedLeftGroup = [];
  let renderedRightGroup = [];
  let isAnimating = false;

  function getCountPerPage() {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function getSlideStep() {
    if (window.innerWidth >= 1280) {
      return (270 + 90) * 3;
    }
    if (window.innerWidth >= 768) {
      return (270 + 40) * 2;
    }
    return 270 + 40;
  }

  function renderCarouselContent() {
    const step = getSlideStep();
    const count = getCountPerPage();

    renderedLeftGroup = getNextCarouselGroup(allPets, currentGroup, count);
    renderedRightGroup = getNextCarouselGroup(allPets, currentGroup, count);

    const leftHTML = renderedLeftGroup.map((p) => createCardHTML(p)).join("");
    const centerHTML = currentGroup.map((p) => createCardHTML(p)).join("");
    const rightHTML = renderedRightGroup.map((p) => createCardHTML(p)).join("");

    track.innerHTML = `
      <div class="slider__block slider__block--left">${leftHTML}</div>
      <div class="slider__block slider__block--center">${centerHTML}</div>
      <div class="slider__block slider__block--right">${rightHTML}</div>
    `;

    track.style.transition = "none";
    track.style.transform = `translateX(-${step}px)`;
  }

  function moveSlider(direction) {
    const step = getSlideStep();
    if (isAnimating) return;
    isAnimating = true;

    track.style.transition = "transform 0.5s ease-in-out";

    if (direction === "next") {
      track.style.transform = `translateX(-${2 * step}px)`;
    } else {
      track.style.transform = "translateX(0%)";
    }

    track.addEventListener("transitionend", function handler(e) {
      if (e.propertyName !== "transform" || e.target !== track) return;

      track.removeEventListener("transitionend", handler);

      if (direction === "next") {
        currentGroup = renderedRightGroup;
      } else {
        currentGroup = renderedLeftGroup;
      }

      renderCarouselContent();
      isAnimating = false;
    });
  }

  allPets = await fetchPetsData();
  if (allPets.length > 0) {
    currentGroup = allPets.slice(0, getCountPerPage());
    renderCarouselContent();

    btnLeft.addEventListener("click", () => moveSlider("prev"));
    btnRight.addEventListener("click", () => moveSlider("next"));

    window.addEventListener("resize", () => {
      currentGroup = allPets.slice(0, getCountPerPage());
      renderCarouselContent();
    });
  }
}
