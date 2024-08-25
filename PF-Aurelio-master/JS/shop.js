let cart = JSON.parse(localStorage.getItem("cart")) || [];
if (!Array.isArray(cart)) {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
}

const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");

const cartContainer = document.createElement("div");
cartContainer.id = "cart-container";
cartContainer.style.display = "none";

const cartTitle = document.createElement("h2");
cartTitle.innerText = "Tu Carrito";

const closeCartButton = document.createElement("button");
closeCartButton.id = "close-cart";
closeCartButton.innerHTML = "&#10005;";
closeCartButton.style.position = "absolute";
closeCartButton.style.top = "0";
closeCartButton.style.left = "0";
closeCartButton.style.background = "transparent";
closeCartButton.style.border = "none";
closeCartButton.style.fontSize = "1.5em";
closeCartButton.style.cursor = "pointer";
closeCartButton.style.color = "black";

const emptyCartButton = document.createElement("button");
emptyCartButton.id = "empty-cart";
emptyCartButton.innerText = "Vaciar Carrito";

const checkoutButton = document.createElement("button");
checkoutButton.id = "checkout-cart";
checkoutButton.innerText = "Finalizar compra";

const cartItems = document.createElement("ul");
cartItems.id = "cart-items";
cartItems.innerHTML = "<li>El carrito se encuentra vacío</li>";

const cartTotal = document.createElement("div");
cartTotal.id = "cart-total";

const cartButtons = document.createElement("div");
cartButtons.id = "cart-buttons";

cartButtons.appendChild(emptyCartButton);
cartButtons.appendChild(checkoutButton);

cartContainer.appendChild(cartTitle);
cartContainer.appendChild(cartItems);
cartContainer.appendChild(cartTotal);
cartContainer.appendChild(cartButtons);
document.body.appendChild(cartContainer);

cartTitle.appendChild(closeCartButton);

function updateCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = "<li>El carrito se encuentra vacío</li>";
  } else {
    cartItems.innerHTML = cart
      .map(
        (product) => `
      <li>
        ${product.name} x ${product.quantity} - $${(
          product.price * product.quantity
        ).toFixed(2)}
      </li>`
      )
      .join("");
  }
  cartTotal.innerText = `Total: $${cart
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2)}`;
  cartCount.innerText = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  showCart();
}

function showCart() {
  cartContainer.style.display = "block";
}

function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function simulatePaymentProcess() {
  const success = Math.random() > 0.5;
  if (!success) {
    throw new Error("El proceso de pago falló.");
  }
}

cartButton.addEventListener("click", showCart);
closeCartButton.addEventListener("click", () => {
  cartContainer.style.display = "none";
});

emptyCartButton.addEventListener("click", () => {
  localStorage.removeItem("cart");
  cart = [];
  updateCart();
});

checkoutButton.addEventListener("click", () => {
  try {
    if (cart.length > 0) {
      simulatePaymentProcess();

      Swal.fire({
        title: "¡Muchísimas gracias por realizar tu compra!",
        text: "Tu pedido será entregado en los próximos 5 días hábiles.",
        icon: "success",
      });

      localStorage.removeItem("cart");
      cart = [];
      updateCart();
    } else {
      Swal.fire({
        title: "Carrito vacío",
        text: "Por favor, agrega productos al carrito antes de finalizar la compra.",
        icon: "warning",
      });
    }
  } catch (error) {
    console.error(
      "Ocurrió un error durante el proceso de finalización de compra:",
      error
    );
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al procesar tu pedido. Intenta nuevamente.",
      icon: "error",
    });
  }
});

const categoryButtons = document.querySelectorAll(".shop-section ul li a");
const clearFilterButton = document.createElement("button");
clearFilterButton.id = "clear-filter";
clearFilterButton.innerText = "Eliminar filtro";
clearFilterButton.style.display = "none";

document.querySelector(".shop-section").appendChild(clearFilterButton);

categoryButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const category = button.dataset.category;
    let productIds = [];

    switch (category) {
      case "new":
        productIds = [5];
        break;
      case "cremas-corporal":
        productIds = [5];
        break;
      case "cremas-facial":
        productIds = [6];
        break;
      case "cremas-hidratante":
        productIds = [7];
        break;
      default:
        productIds = [];
        break;
    }

    fetch("../productos.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((products) => {
        const filteredProducts = productIds.length
          ? products.filter((product) => productIds.includes(product.id))
          : products;
        renderProducts(filteredProducts);
        clearFilterButton.style.display =
          productIds.length > 0 ? "block" : "none";
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
      });
  });
});

clearFilterButton.addEventListener("click", () => {
  fetch("../productos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((products) => {
      const filteredProducts = products.filter((product) =>
        [5, 6, 7].includes(product.id)
      );
      renderProducts(filteredProducts);
      clearFilterButton.style.display = "none";
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error);
    });
});

function renderProducts(products) {
  const productSection = document.querySelector("#product-list");
  productSection.innerHTML = "";
  products.forEach((product) => {
    const article = document.createElement("article");
    article.className = "product";
    article.dataset.productId = product.id;
    article.dataset.category = product.category;

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = `Producto ${product.name}`;

    const h3 = document.createElement("h3");
    h3.innerHTML = `${product.name}<br>${product.description}`;

    const h4 = document.createElement("h4");
    h4.innerText = `$${product.price.toFixed(2)}`;

    const button = document.createElement("button");
    button.className = "btn-custom";
    button.dataset.productId = product.id;
    button.innerText = "Agregar al Carrito";

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(h4);
    article.appendChild(button);

    productSection.appendChild(article);
  });

  document.querySelectorAll(".btn-custom").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(
        e.currentTarget.getAttribute("data-product-id")
      );
      const product = products.find((p) => p.id === productId);
      if (product) {
        addToCart(product);
      }
    });
  });
}

fetch("../productos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then((products) => {
    const filteredProducts = products.slice(4, 7);

    renderProducts(filteredProducts);
  })
  .catch((error) => {
    console.error("Error al cargar productos:", error);
  });

updateCart();
