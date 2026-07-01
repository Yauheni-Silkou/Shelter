import { fetchPetsData } from "./api.js";

export async function initPopupEngine() {
  const blackout = document.getElementById("modal-blackout");
  const popupContainer = document.getElementById("popup-container");
  if (!blackout || !popupContainer) return;

  const allPets = await fetchPetsData();
  if (!allPets || allPets.length === 0) return;

  function renderModalContent(pet) {
    let cleanPath = pet.img.replace("../../", "");
    if (cleanPath.includes("images/") && !cleanPath.includes("images/pets-")) {
      cleanPath = cleanPath.replace("images/", "images/pets-");
    }

    popupContainer.innerHTML = `
  <button class="modal-close-button" id="modal-close-btn" aria-label="Close popup">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="currentColor"/>
    </svg>
  </button>
  
  <div class="modal-window">
    <img class="modal-window__image" src="${cleanPath}" alt="${pet.name}" />
    <div class="modal-window__content">
      <h3 class="modal-window__title">${pet.name}</h3>
      <h4 class="modal-window__subtitle">${pet.type} - ${pet.breed}</h4>
      <p class="modal-window__description">${pet.description}</p>
      <ul class="modal-window__list">
        <li class="modal-window__list-item"><strong>Age:</strong>&nbsp;${pet.age}</li>
        <li class="modal-window__list-item"><strong>Inoculations:</strong>&nbsp;${pet.inoculations.join(", ")}</li>
        <li class="modal-window__list-item"><strong>Diseases:</strong>&nbsp;${pet.diseases.join(", ")}</li>
        <li class="modal-window__list-item"><strong>Parasites:</strong>&nbsp;${pet.parasites.join(", ")}</li>
      </ul>
    </div>
  </div>
    `;
  }

  function openPopup(petName) {
    const matchedPet = allPets.find((p) => p.name === petName);
    if (!matchedPet) return;

    renderModalContent(matchedPet);
    blackout.classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function closePopup() {
    blackout.classList.remove("open");
    document.body.classList.remove("no-scroll");
    popupContainer.innerHTML = "";
  }

  document.body.addEventListener("click", (e) => {
    const card = e.target.closest(".pet-card");

    if (card) {
      const petName = card.dataset.name;
      if (petName) openPopup(petName);
      return;
    }

    const closeBtn = e.target.closest("#modal-close-btn");

    if (closeBtn || e.target === blackout) {
      closePopup();
    }
  });

  document.body.addEventListener("mouseover", (e) => {
    if (e.target.closest("#modal-close-btn") || e.target === blackout) {
      blackout.style.cursor = "pointer";
    } else {
      blackout.style.cursor = "default";
    }
  });
}
