/* ==========================================================
   TASK 2: PRODUCT LISTING USING FETCH API
   - Fetch products from public API
   - Convert response into JSON
   - Display product title + image row-wise
   - Proper error handling using catch()
   - Button disables after successful load
========================================================== */

const loadProductsBtn = document.getElementById("loadProducts");
const productsDiv = document.getElementById("products");
const statusMessage = document.getElementById("statusMessage");

const API_URL = "https://fakestoreapi.com/products";

// Load products on button click
loadProductsBtn.addEventListener("click", fetchProducts);

function fetchProducts() {
  // UI reset
  statusMessage.style.color = "black";
  statusMessage.textContent = "Loading products...";
  productsDiv.innerHTML = "";

  // Disable button while loading
  loadProductsBtn.disabled = true;
  loadProductsBtn.textContent = "Loading...";

  fetch(API_URL)
    .then((response) => {
      // Handle response errors
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .then((data) => {
      // Show success message
      statusMessage.textContent = `Loaded ${data.length} products ✅`;

      // Display products
      displayProducts(data);

      // Button stays disabled after loading (professional)
      loadProductsBtn.textContent = "Products Loaded";
    })
    .catch((error) => {
      // Show error message
      statusMessage.style.color = "red";
      statusMessage.textContent = "Error: Could not load products ❌";

      console.log(error);

      // Re-enable button if error happens
      loadProductsBtn.disabled = false;
      loadProductsBtn.textContent = "Load Products";
    });
}

// Display products dynamically
function displayProducts(products) {
  productsDiv.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
    `;

    productsDiv.appendChild(card);
  });
}
