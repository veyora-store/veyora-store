// ==========================================
// VEYORA STORE
// PRODUCT DATABASE
// ==========================================

const products = [

  {
    id: 1,
    name: "Minimal Table Lamp",
    category: "home",
    price: 799,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "A modern minimal lamp that adds a warm and elegant look to your room."
  },

  {
    id: 2,
    name: "Aesthetic Vase",
    category: "home",
    price: 499,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80",
    description: "Elegant decorative vase for modern homes and bedrooms."
  },

  {
    id: 3,
    name: "Rosemary water",
    category: "lifestyle",
    price: 999,
    image: "file_00000000ccc48211b5df4d04422e6b03.png",
    description: "A stylish everyday watch with a premium modern appearance."
  },

  {
    id: 4,
    name: "Portable LED Light",
    category: "electronics",
    price: 599,
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
    description: "Compact LED light for your desk, bedroom or workspace."
  },

  {
    id: 5,
    name: "Beauty Organizer",
    category: "beauty",
    price: 449,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    description: "Keep your beauty essentials organized with this stylish organizer."
  },

  {
    id: 6,
    name: "Modern Cushion",
    category: "home",
    price: 399,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    description: "Soft decorative cushion designed for a comfortable modern interior."
  }

];


// ==========================================
// CART
// ==========================================

let cart = [];


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(list = products) {

  const grid = document.getElementById("productGrid");

  grid.innerHTML = "";

  if (list.length === 0) {

    grid.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;padding:50px;">
        No products found.
      </p>
    `;

    return;
  }

  list.forEach(product => {

    grid.innerHTML += `

      <div class="product-card">

        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        <div class="product-info">

          <div class="product-category">
            ${product.category}
          </div>

          <div class="product-name">
            ${product.name}
          </div>

          <div class="product-price">
            ₹${product.price}
          </div>

          <div class="product-buttons">

            <button
              class="view-btn"
              onclick="viewProduct(${product.id})">
              VIEW
            </button>

            <button
              class="add-btn"
              onclick="addToCart(${product.id})">
              ADD
            </button>

          </div>

        </div>

      </div>

    `;

  });

}


// ==========================================
// SEARCH
// ==========================================

function searchProducts() {

  const search =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();

  const results = products.filter(product =>

    product.name
      .toLowerCase()
      .includes(search)

    ||

    product.category
      .toLowerCase()
      .includes(search)

  );

  displayProducts(results);

}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterProducts(category) {

  if (category === "all") {

    displayProducts(products);

    return;

  }

  const results = products.filter(
    product => product.category === category
  );

  displayProducts(results);

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id) {

  const product =
    products.find(p => p.id === id);

  if (!product) return;

  const existing =
    cart.find(item => item.id === id);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({

      ...product,

      quantity: 1

    });

  }

  updateCart();

  alert(
    product.name + " added to cart!"
  );

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartCount =
    document.getElementById("cartCount");

  const cartTotal =
    document.getElementById("cartTotal");


  cartItems.innerHTML = "";


  let total = 0;

  let count = 0;


  cart.forEach(item => {

    total +=
      item.price * item.quantity;

    count +=
      item.quantity;


    cartItems.innerHTML += `

      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div class="cart-item-info">

          <h4>
            ${item.name}
          </h4>

          <p>
            ₹${item.price} × ${item.quantity}
          </p>

        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${item.id})">

          ✕

        </button>

      </div>

    `;

  });


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p style="text-align:center;color:#777;">
        Your cart is empty.
      </p>
    `;

  }


  cartCount.textContent = count;

  cartTotal.textContent =
    "₹" + total;

}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(id) {

  cart =
    cart.filter(item => item.id !== id);

  updateCart();

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

  document
    .getElementById("cart")
    .classList
    .add("active");

  document
    .getElementById("cartOverlay")
    .classList
    .add("active");

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

  document
    .getElementById("cart")
    .classList
    .remove("active");

  document
    .getElementById("cartOverlay")
    .classList
    .remove("active");

}


// ==========================================
// PRODUCT DETAILS
// ==========================================

function viewProduct(id) {

  const product =
    products.find(p => p.id === id);

  if (!product) return;


  document.getElementById(
    "modalImage"
  ).src = product.image;


  document.getElementById(
    "modalCategory"
  ).textContent =
    product.category;


  document.getElementById(
    "modalName"
  ).textContent =
    product.name;


  document.getElementById(
    "modalPrice"
  ).textContent =
    "₹" + product.price;


  document.getElementById(
    "modalDescription"
  ).textContent =
    product.description;


  document.getElementById(
    "modalAddButton"
  ).onclick =
    function () {

      addToCart(product.id);

      closeProduct();

    };


  document
    .getElementById("productModal")
    .classList
    .add("active");

}


// ==========================================
// CLOSE PRODUCT
// ==========================================

function closeProduct() {

  document
    .getElementById("productModal")
    .classList
    .remove("active");

}


// ==========================================
// WHATSAPP ORDER
// ==========================================

function orderWhatsApp() {

  if (cart.length === 0) {

    alert("Your cart is empty!");

    return;

  }


  let message =
    "Hello VEYORA STORE 👋%0A%0A";

  message +=
    "I want to order:%0A%0A";


  let total = 0;


  cart.forEach(item => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;


    message +=
      "🛍️ " +
      item.name +
      "%0A";

    message +=
      "Quantity: " +
      item.quantity +
      "%0A";

    message +=
      "Price: ₹" +
      itemTotal +
      "%0A%0A";

  });


  message +=
    "💰 Total: ₹" +
    total +
    "%0A%0A";

  message +=
    "Please confirm my order. Thank you!";


  // ======================================
  // CHANGE THIS NUMBER TO YOUR WHATSAPP
  // ======================================

  const phone =
    "919999999999";


  const url =
    "https://wa.me/" +
    phone +
    "?text=" +
    message;


  window.open(url, "_blank");

}


// ==========================================
// START WEBSITE
// ==========================================

displayProducts();

updateCart();
