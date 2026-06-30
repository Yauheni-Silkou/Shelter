export async function fetchPetsData() {
  try {
    const response = await fetch("./pets.json");

    if (!response.ok) {
      throw new Error(`HTTP network error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Critical failure downloading pet data configuration:",
      error,
    );
    return [];
  }
}
