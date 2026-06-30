export function shuffleArray(array) {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

export function createCardHTML(pet) {
  let path = pet.img.replace("../../", "");

  if (path.includes("images/") && !path.includes("images/pets-")) {
    path = path.replace("images/", "images/pets-");
  }

  return `
      <article class="pet-card" data-name="${pet.name}">
        <img class="pet-card__image" src="${path}" alt="${pet.name}" />
        <h3 class="pet-card__title">${pet.name}</h3>
        <button class="button button--secondary">Learn more</button>
      </article>
    `;
}

export function getNextCarouselGroup(allPets, currentGroup, count) {
  const availablePets = allPets.filter(
    (pet) => !currentGroup.some((current) => current.name === pet.name),
  );
  const shuffledAvailable = shuffleArray(availablePets);
  return shuffledAvailable.slice(0, count);
}

export function generatePaginationMatrix(allPets) {
  if (!allPets || allPets.length === 0) return [];
  let dynamicMatrix = [];
  for (let i = 0; i < 6; i++) {
    const shuffledBlock = shuffleArray(allPets);
    dynamicMatrix = dynamicMatrix.concat(shuffledBlock);
  }
  return dynamicMatrix;
}
