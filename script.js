// ==========================================
// VEYORA STORE
// PRODUCT DATABASE
// ==========================================

const products = [
  {
    id: 1,
    name: "Minimal Table Lamp",
    category: "home",
    price: 499,
    image: "lamp.png",
    description: "Modern minimal table lamp for your room."
  },
  {
    id: 2,
    name: "Aesthetic Vase",
    category: "home",
    price: 399,
    image: "vase.png",
    description: "Beautiful aesthetic vase for home decoration."
  },
  {
    id: 3,
    name: "Premium Watch",
    category: "lifestyle",
    price: 999,
    image: "watch.png",
    description: "Stylish premium watch for everyday use."
  },
  {
    id: 4,
    name: "Portable LED Light",
    category: "electronics",
    price: 599,
    image: "led.png",
    description: "Portable LED light with a modern design."
  },
  {
    id: 5,
    name: "Beauty Organizer",
    category: "beauty",
    price: 449,
    image: "beauty.png",
    description: "Keep your cosmetics organized and clean."
  },
  {
    id: 6,
    name: "Modern Cushion",
    category: "home",
    price: 349,
    image: "cushion.png",
    description: "Soft and stylish cushion for your home."
  }
];

let cart = [];

const productGrid = document.getElementById("productGrid");

function displayProducts(list = products) {
  productGrid.innerHTML = "";

  list.forEach(product => {
    productGrid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}"
             onerror="this.style.display='none'">

        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="price">₹${product.price}</p>

          <button onclick="viewProduct(${product.id})">
            View Product
          </button>
        </div>
      </div>
    `;
  });
}

function searchProducts() {
  const search = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  const results = products.filter(product =>
    product.name.toLowerCase().includes(search)
  );

  displayProducts(results);
}

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

function addToCart(id) {
  const product = products.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCart();
  closeProduct();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <p>₹${item.price} × ${item.quantity}</p>
        </div>

        <button onclick="removeFromCart(${item.id})">
          ✕
        </button>
      </div>
    `;
  });

  cartTotal.innerText = "₹" + total;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function openCart() {
  document.getElementById("cartOverlay").classList.add("active");
}

function closeCart() {
  document.getElementById("cartOverlay").classList.remove("active");
}

function viewProduct(id) {
  const product = products.find(p => p.id === id);

  document.getElementById("productModal").classList.add("active");

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalName").innerText = product.name;
  document.getElementById("modalPrice").innerText =
    "₹" + product.price;
  document.getElementById("modalDescription").innerText =
    product.description;

  document.getElementById("modalAddButton").onclick = function () {
    addToCart(product.id);
  };
}

function closeProduct() {
  document.getElementById("productModal").classList.remove("active");
}

function orderWhatsApp() {

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const house = document.getElementById("customerHouse").value.trim();
  const area = document.getElementById("customerArea").value.trim();
  const city = document.getElementById("customerCity").value.trim();
  const state = document.getElementById("customerState").value.trim();
  const pincode = document.getElementById("customerPincode").value.trim();

  if (!name || !phone || !house || !area || !city || !state || !pincode) {
    alert("Please fill in all delivery details.");
    return;
  }

  let message = `🛍️ *NEW VEYORA STORE ORDER*

👤 *Customer Details*
Name: ${name}
Phone: ${phone}
House/Building: ${house}
Area: ${area}
City: ${city}
State: ${state}
Pincode: ${pincode}

📦 *ORDER ITEMS*

`;

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    message += `🛒 ${item.name}
Quantity: ${item.quantity}
Price: ₹${itemTotal}

`;
  });

  message += `💰 *TOTAL: ₹${total}*

Please confirm my order. 🙏`;

  // CHANGE THIS TO YOUR WHATSAPP NUMBER
  const whatsappNumber = "919999999999";

  const whatsappURL =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(message);

  window.location.href = whatsappURL;
}

displayProducts(products);
updateCart();
