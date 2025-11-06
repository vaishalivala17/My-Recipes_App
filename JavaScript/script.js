// ----- HEADER -----
const header = document.createElement("header");
header.innerHTML = `
  <h1>🍳 Recipe Gallery</h1>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="./Pages/all-recipes.html">Recipes</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
`;
document.body.prepend(header); // adds header at top of body

const recipe = () => {
  fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(data => {
      const recipesList = Object.values(data.recipes);
      const container = document.getElementById("recipe-container");

      recipesList.forEach(item => {
        const recipeDiv = document.createElement("div");
        //  Bootstrap classes for 3 column
        recipeDiv.classList.add("col-md-4", "col-sm-6", "col-12");
        recipeDiv.innerHTML = `
          <div class="card h-100 shadow-sm position-relative overflow-hidden">
            <img src="${item.image}" class="card-img-top" alt="${item.name}">
            <div class="overlay d-flex justify-content-center align-items-center">
              <span class="material-symbols-outlined fs-1 search-icon p-2" style="background-color: rgba(31, 32, 31, 0.4)"><a href="./Pages/all-recipes.html">search</a></span>
            </div>
            <div class="card-body text-center mt-4">
              <h4 class="card-title fw-bold mt-3">${item.name}</h4>
            </div>
          </div>
        `;
        container.appendChild(recipeDiv);
      });
    })
    .catch(error => console.log("Error fetching API:", error));
};

// ----- FOOTER -----
const footer = document.createElement("footer");
const year = new Date().getFullYear();
footer.innerHTML = `&copy; ${year} Vaishali’s Recipe Page.`;
document.body.appendChild(footer);

document.addEventListener("DOMContentLoaded", recipe);
