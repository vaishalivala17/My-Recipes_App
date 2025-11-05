const recipe = () => {
  fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(data => {
      const recipesList = Object.values(data.recipes);
      const contain = document.getElementById("recipe-container");

      recipesList.forEach(item => {
        const recipeDiv = document.createElement("div");
        recipeDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h2>${item.name}</h2>
        `;
        contain.appendChild(recipeDiv);
      });
    })
    .catch(error => {
      console.log("Error fetching API:", error);
    });
};

document.addEventListener("DOMContentLoaded", recipe);


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
document.body.prepend(header); // adds header at top of body

// ----- FOOTER -----
const footer = document.createElement("footer");
const year = new Date().getFullYear();
footer.innerHTML = `&copy; ${year} Vaishali’s Recipe Page.`;
document.body.appendChild(footer);
