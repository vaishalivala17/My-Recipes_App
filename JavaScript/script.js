// ----- HEADER -----
const header = document.createElement("header");
header.innerHTML = `
  <h1>🍳 Recipe Gallery</h1>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Recipes</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
`;
document.body.prepend(header);

// ----- FETCH & DISPLAY RECIPES -----
const recipe = () => {
  fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(data => {
      const recipesList = data.recipes;
      const container = document.getElementById("recipe-container");

      recipesList.forEach(item => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("col-md-4", "col-sm-6", "col-12");

        recipeDiv.innerHTML = `
          <div class="card h-100 shadow-sm position-relative overflow-hidden">
            <img src="${item.image}" class="card-img-top" alt="${item.name}">
            
            <div class="overlay d-flex justify-content-center align-items-center">
              <span class="material-symbols-outlined fs-1 search-icon p-3" 
                    style="cursor:pointer; background-color: rgba(31,32,31,0.4); border-radius:50%;" 
                    data-id="${item.id}">
                search
              </span>
            </div>

            <div class="card-body text-center mt-4">
              <p class="text-muted">${item.cuisine} | ${item.mealType.join(", ")}</p>
              <h4 class="card-title fw-bold mt-3">${item.name}</h4>
            </div>
          </div>
        `;
        container.appendChild(recipeDiv);
      });

      //  Click to open modal
      document.querySelectorAll(".search-icon").forEach(icon => {
        icon.addEventListener("click", e => {
          const recipeId = e.currentTarget.getAttribute("data-id");
          console.log("Clicked on recipe:", recipeId);
          openModal(recipeId);
        });
      });
    })
    .catch(error => console.log("Error fetching API:", error));
};

function openModal(id) {
  fetch(`https://dummyjson.com/recipes/${id}`)
    .then(response => response.json())
    .then(recipe => {
      console.log("Loaded recipe:", recipe.name);
      const modalBody = document.getElementById("modal-body-content");
      modalBody.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="img-fluid rounded mb-3">
        <h3>${recipe.name}</h3>
        <p class="text-muted">${recipe.cuisine} | ${recipe.mealType.join(", ")}</p>
        <h4 class="mt-3">Ingredients:</h4>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        <h4 class="mt-3">Instructions:</h4>
        <p>${recipe.instructions}</p>
        <h5 class="mt-3">Cook Time Minutes:<span class="text-muted ms-3">${recipe.cookTimeMinutes}</span></h5>
        <h5 class="mt-3">Servings:<span class="text-muted ms-3">${recipe.servings}</span></h5>
        <h5 class="mt-3">Calories Per Serving:<span class="text-muted ms-3">${recipe.caloriesPerServing}</span></h5>
      `;

      const modalElement = document.getElementById("recipeModal");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    })
    .catch(err => console.error("Error loading recipe details:", err));
}

// ----- FOOTER -----
const footer = document.createElement("footer");
const year = new Date().getFullYear();
footer.innerHTML = `&copy; ${year} Vaishali’s Recipe Page.`;
document.body.appendChild(footer);

document.addEventListener("DOMContentLoaded", recipe);
