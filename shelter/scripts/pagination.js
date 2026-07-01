import { fetchPetsData } from "./api.js";
import { generatePaginationMatrix, createCardHTML } from "./utils.js";

export async function initPagination(gridContainer) {
  const controls = document.getElementById("pagination-controls");
  const btnFirst = document.getElementById("btn-first");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnLast = document.getElementById("btn-last");
  const pageNumDisplay = document.getElementById("page-num");

  if (
    !gridContainer ||
    !controls ||
    !btnFirst ||
    !btnPrev ||
    !btnNext ||
    !btnLast ||
    !pageNumDisplay
  ) {
    return;
  }

  let allPets = [];
  let flat48Matrix = [];
  let currentPage = 1;

  function getCardsPerPage() {
    if (window.innerWidth >= 1280) return 8;
    if (window.innerWidth >= 768) return 6;
    return 3;
  }

  function getTotalPages() {
    return 48 / getCardsPerPage();
  }

  function renderPage() {
    const cardsPerPage = getCardsPerPage();
    const totalPages = getTotalPages();

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const activePageSlice = flat48Matrix.slice(startIndex, endIndex);

    gridContainer.style.opacity = "0";
    gridContainer.style.transition = "opacity 0.5s ease-in-out";

    setTimeout(() => {
      gridContainer.innerHTML = activePageSlice
        .map((pet) => createCardHTML(pet))
        .join("");
      pageNumDisplay.textContent = currentPage;

      if (currentPage === 1) {
        btnFirst.disabled = true;
        btnPrev.disabled = true;
        btnFirst.classList.add("pagination__button--disabled");
        btnPrev.classList.add("pagination__button--disabled");
      } else {
        btnFirst.disabled = false;
        btnPrev.disabled = false;
        btnFirst.classList.remove("pagination__button--disabled");
        btnPrev.classList.remove("pagination__button--disabled");
      }

      if (currentPage === totalPages) {
        btnNext.disabled = true;
        btnLast.disabled = true;
        btnNext.classList.add("pagination__button--disabled");
        btnLast.classList.add("pagination__button--disabled");
      } else {
        btnNext.disabled = false;
        btnLast.disabled = false;
        btnNext.classList.remove("pagination__button--disabled");
        btnLast.classList.remove("pagination__button--disabled");
      }
      gridContainer.style.opacity = "1";
    }, 500);
    window.dispatchEvent(new CustomEvent("paginationRendered"));
  }

  controls.addEventListener("click", (e) => {
    const targetButton = e.target.closest(".pagination__button");
    if (!targetButton || targetButton.disabled) {
      return;
    }

    const action = targetButton.dataset.action;
    const totalPages = getTotalPages();

    switch (action) {
      case "first":
        currentPage = 1;
        break;
      case "prev":
        currentPage--;
        break;
      case "next":
        currentPage++;
        break;
      case "last":
        currentPage = totalPages;
        break;
      default:
        return;
    }

    renderPage();
  });

  allPets = await fetchPetsData();
  if (allPets.length > 0) {
    flat48Matrix = generatePaginationMatrix(allPets);
    renderPage();

    window.addEventListener("resize", () => {
      renderPage();
    });
  }
}
