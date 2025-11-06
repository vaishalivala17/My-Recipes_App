const recipe = () => {
  fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(data => {
      const recipesList = Object.values(data.recipes);
      const container = document.getElementById("recipe-container");

      recipesList.forEach(item => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("col-md-4", "col-sm-6", "col-12");
        recipeDiv.innerHTML = `
          <div class="card h-100 shadow-sm position-relative overflow-hidden">
            <img src="${item.image}" class="card-img-top" alt="${item.name}">
            <div class="overlay d-flex justify-content-center align-items-center">
              <span class="material-icons search-icon">search</span>
            </div>
            <div class="card-body text-center">
              <h4 class="card-title">${item.name}</h4>
              <p class="text-muted">${item.cuisine} | ${item.mealType.join(", ")}</p>
              <a href="#" class="btn btn-outline-primary btn-sm">View Details</a>
            </div>
          </div>
        `;
        container.appendChild(recipeDiv);
      });
    })
    .catch(error => console.log("Error fetching API:", error));
};

document.addEventListener("DOMContentLoaded", recipe);
document.getElementById("year").textContent = new Date().getFullYear();
