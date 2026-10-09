/* =====================================================
   VEYORA STORE
   PRODUCT + CART + WHATSAPP SYSTEM
===================================================== */


/* =====================================================
   PRODUCTS
===================================================== */

const products = [

  {
    id: 1,
    name: "Rosemary water",
    category: "Hair care",
    price: 349,
    tag: "BESTSELLER",
    image: "file_00000000ccc48211b5df4d04422e6b03.png",
    description:
      "Healthy hair starts with nature. 🌱✨  "
  },

  {
    id: 2,
    name: "Premium watch",
    category: "lifestyle",
    price: 399,
    tag: "NEW",
    image: "watch.png",
    description:
      "⌚ Timeless style. Premium feel. Made to stand out. ✨."
  },

  {
    id: 3,
    name: "BLISS Handbags",
    category: "lifestyle",
    price: 399,
    tag: "TRENDING",
    image: "ladybag.png",
    description:
      "✨ Elegance in every shade 👜💖 | Shop the BLISS Handbag"
  },

  {
    id: 4,
    name: "Portable LED Light",
    category: "electronics",
    price: 599,
    tag: "POPULAR",
    image: "led.png",
    description:
      "Compact portable LED light with a modern design. Perfect for home, travel and everyday use."
  },

  {
    id: 5,
    name: "Beauty Organizer",
    category: "beauty",
    price: 449,
    tag: "NEW",
    image: "beauty.png",
    description:
      "Keep your cosmetics, makeup and beauty essentials organized in one stylish place."
  },

  {
    id: 6,
    name: "Modern Soft Cushion",
    category: "home",
    price: 349,
    tag: "TRENDING",
    image: "cushion.png",
    description:
      "A soft modern cushion designed to make your room more comfortable and stylish."
  }

];


/* =====================================================
   CART
===================================================== */

let cart = [];


/* =====================================================
   ELEMENTS
===================================================== */

const productGrid =
  document.getElementById("productGrid");

const productCount =
  document.getElementById("productCount");

const noProducts =
  document.getElementById("noProducts");

const cartDrawer =
  document.getElementById("cartDrawer");

const cartOverlay =
  document.getElementById("cartOverlay");

const cartItems =
  document.getElementById("cartItems");

const emptyCart =
  document.getElementById("emptyCart");

const cartTotal =
  document.getElementById("cartTotal");

const cartCount =
  document.getElementById("cartCount");


/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayProducts(list = products) {

  productGrid.innerHTML = "";

  productCount.innerText =
    list.length + " PRODUCTS";


  if (list.length === 0) {

    noProducts.style.display = "block";

    return;

  }

  noProducts.style.display = "none";


  list.forEach((product, index) => {

    const card =
      document.createElement("article");

    card.className = "product-card";

    card.style.animationDelay =
      `${index * 0.05}s`;


    card.innerHTML = `

      <div class="product-image-wrapper">

        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.src='data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
              <rect width="100%" height="100%" fill="#eeeeee"/>
              <text x="50%" y="50%" text-anchor="middle"
                dominant-baseline="middle"
                font-family="Arial"
                font-size="20"
                fill="#888">
                VEYORA
              </text>
            </svg>
          `)}'"
        >

        <span class="product-tag">
          ${product.tag}
        </span>

      </div>


      <div class="product-info">

        <p class="product-category">
          ${product.category}
        </p>

        <h3 class="product-name">
          ${product.name}
        </h3>

        <div class="product-price">
          ₹${product.price.toLocaleString("en-IN")}
        </div>


        <div class="product-buttons">

          <button
            class="view-btn"
            onclick="viewProduct(${product.id})"
          >
            VIEW
          </button>

          <button
            class="add-btn"
            onclick="addToCart(${product.id})"
          >
            ADD +
          </button>

        </div>

      </div>

    `;


    productGrid.appendChild(card);

  });

}


/* =====================================================
   SEARCH
===================================================== */

function searchProducts() {

  const input =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();


  const results =
    products.filter(product => {

      return (
        product.name
          .toLowerCase()
          .includes(input)

        ||

        product.category
          .toLowerCase()
          .includes(input)
      );

    });


  displayProducts(results);

}


function clearSearch() {

  document.getElementById(
    "searchInput"
  ).value = "";

  displayProducts(products);

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

function filterProducts(
  category,
  clickedButton
) {

  document
    .querySelectorAll(".category-button")
    .forEach(button => {

      button.classList.remove("active");

    });


  if (clickedButton) {

    clickedButton.classList.add("active");

  }


  if (category === "all") {

    displayProducts(products);

    return;

  }


  const results =
    products.filter(
      product =>
        product.category === category
    );


  displayProducts(results);

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {

  const product =
    products.find(
      product => product.id === id
    );


  if (!product) return;


  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      ...product,

      quantity: 1

    });

  }


  updateCart();

  openCart();

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

  cartItems.innerHTML = "";


  let total = 0;

  let quantityTotal = 0;


  cart.forEach(item => {

    const itemTotal =
      item.price * item.quantity;


    total += itemTotal;

    quantityTotal += item.quantity;


    const cartItem =
      document.createElement("div");

    cartItem.className = "cart-item";


    cartItem.innerHTML = `

      <img
        class="cart-item-image"
        src="${item.image}"
        alt="${item.name}"
      >

      <div class="cart-item-info">

        <h4>
          ${item.name}
        </h4>

        <p>
          Quantity: ${item.quantity}
        </p>

        <div class="cart-item-price">
          ₹${itemTotal.toLocaleString("en-IN")}
        </div>

      </div>

      <button
        class="remove-btn"
        onclick="removeFromCart(${item.id})"
      >
        ×
      </button>

    `;


    cartItems.appendChild(cartItem);

  });


  cartTotal.innerText =
    "₹" + total.toLocaleString("en-IN");


  cartCount.innerText =
    quantityTotal;


  if (cart.length === 0) {

    emptyCart.classList.add("show");

  } else {

    emptyCart.classList.remove("show");

  }

}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );


  updateCart();

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

  cartDrawer.classList.add("active");

  cartOverlay.classList.add("active");

  document.body.style.overflow =
    "hidden";

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

  cartDrawer.classList.remove("active");

  cartOverlay.classList.remove("active");

  document.body.style.overflow =
    "";

}


/* =====================================================
   PRODUCT MODAL
===================================================== */

function viewProduct(id) {

  const product =
    products.find(
      product => product.id === id
    );


  if (!product) return;


  document.getElementById(
    "modalImage"
  ).src = product.image;


  document.getElementById(
    "modalImage"
  ).alt = product.name;


  document.getElementById(
    "modalCategory"
  ).innerText =
    product.category;


  document.getElementById(
    "modalName"
  ).innerText =
    product.name;


  document.getElementById(
    "modalPrice"
  ).innerText =
    "₹" +
    product.price.toLocaleString("en-IN");


  document.getElementById(
    "modalDescription"
  ).innerText =
    product.description;


  document.getElementById(
    "modalAddButton"
  ).onclick = function () {

    addToCart(product.id);

    closeProduct();

  };


  document
    .getElementById("productModal")
    .classList.add("active");


  document.body.style.overflow =
    "hidden";

}


/* =====================================================
   CLOSE PRODUCT
===================================================== */

function closeProduct() {

  document
    .getElementById("productModal")
    .classList.remove("active");


  document.body.style.overflow =
    "";

}


function closeProductOutside(event) {

  if (
    event.target.id ===
    "productModal"
  ) {

    closeProduct();

  }

}


/* =====================================================
   WHATSAPP ORDER
===================================================== */

function orderWhatsApp() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty!"
    );

    return;

  }


   function orderInstagram() {
    const instagramUsername = "veyora.store_";

    const instagramURL =
        "https://www.instagram.com/veyora.store_?stkn=MWQ0MWt2d29tb3FqMw==" + instagramUsername;

    window.location.href = instagramURL;
      
   }


  const name =
    document
      .getElementById("customerName")
      .value
      .trim();


  const phone =
    document
      .getElementById("customerPhone")
      .value
      .trim();


  const house =
    document
      .getElementById("customerHouse")
      .value
      .trim();


  const area =
    document
      .getElementById("customerArea")
      .value
      .trim();


  const city =
    document
      .getElementById("customerCity")
      .value
      .trim();


  const state =
    document
      .getElementById("customerState")
      .value
      .trim();


  const pincode =
    document
      .getElementById("customerPincode")
      .value
      .trim();


  if (
    !name ||
    !phone ||
    !house ||
    !area ||
    !city ||
    !state ||
    !pincode
  ) {

    alert(
      "Please fill in all delivery details."
    );

    return;

  }


  let message =

`🛍️ *NEW VEYORA STORE ORDER*

👤 *CUSTOMER DETAILS*

Name: ${name}
📱 Phone: ${phone}
🏠 House/Building: ${house}
📍 Area: ${area}
🏙️ City: ${city}
🗺️ State: ${state}
📮 Pincode: ${pincode}

📦 *ORDER DETAILS*

`;


  let total = 0;


  cart.forEach(
    (item, index) => {

      const itemTotal =
        item.price *
        item.quantity;


      total += itemTotal;


      message +=

`${index + 1}. ${item.name}
Quantity: ${item.quantity}
Price: ₹${itemTotal}

`;

    }
  );


  message +=

`💰 *TOTAL: ₹${total}*

✅ Please confirm my order.

🙏 Thank you for shopping with VEYORA STORE!`;


  /*
    IMPORTANT:

    Replace 919999999999
    with YOUR WhatsApp number.

    India example:

    9876543210

    becomes:

    919876543210
  */

  const whatsappNumber =
    "9194973 80191";


  const whatsappURL =

    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(message);


  window.location.href =
    whatsappURL;

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeCart();

      closeProduct();

    }

  }
);


/* =====================================================
   START WEBSITE
===================================================== */

displayProducts(products);

updateCart();
