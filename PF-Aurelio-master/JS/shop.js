document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const cartButton = document.getElementById("cart-button");
  const cartCount = document.getElementById("cart-count");

  let cartContainer = document.createElement("div");
  cartContainer.id = "cart-container";

  let cartTitle = document.createElement("h2");
  cartTitle.innerText = "Tu Carrito";

  let closeCartButton = document.createElement("button");
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

  let emptyCartButton = document.createElement("button");
  emptyCartButton.id = "empty-cart";
  emptyCartButton.innerText = "Vaciar Carrito";

  let checkoutButton = document.createElement("button");
  checkoutButton.id = "checkout-cart";
  checkoutButton.innerText = "Finalizar compra";

  let cartItems = document.createElement("ul");
  cartItems.id = "cart-items";
  cartItems.innerHTML = "<li>El carrito se encuentra vacío</li>";

  let cartTotal = document.createElement("div");
  cartTotal.id = "cart-total";

  let cartButtons = document.createElement("div");
  cartButtons.id = "cart-buttons";

  cartButtons.appendChild(emptyCartButton);
  cartButtons.appendChild(checkoutButton);

  cartContainer.appendChild(cartTitle);
  cartContainer.appendChild(cartItems);
  cartContainer.appendChild(cartTotal);
  cartContainer.appendChild(cartButtons);
  document.body.appendChild(cartContainer);

  cartTitle.appendChild(closeCartButton);

  fetch("../productos.json")
    .then((response) => response.json())
    .then((data) => {
      const buttons = document.querySelectorAll(
        ".btn-bestseller, .btn-bestseller2, .btn-shop, .btn-shop2, .btn-shop3"
      );

      buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = parseInt(
            e.currentTarget.getAttribute("data-product-id")
          );
          const product = data.find((item) => item.id === productId);
          if (product) {
            addToCart(product);
          } else {
            console.error("Producto no encontrado.");
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });

  cartButton.addEventListener("click", showCart);
  closeCartButton.addEventListener("click", () => {
    cartContainer.style.display = "none";
  });

  emptyCartButton.addEventListener("click", () => {
    cart.length = 0;
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
    } finally {
    }
  });

  function simulatePaymentProcess() {
    const success = Math.random() > 0.5;
    if (!success) {
      throw new Error("El proceso de pago falló.");
    }
  }

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    updateCart();
  }

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
});

const categoryLinks = document.querySelectorAll(".shop-section ul li a");
const productsContainer = document.getElementById("products-container");

categoryLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const category = e.currentTarget.getAttribute("data-category");
    filterProductsByCategory(category);
  });
});

function filterProductsByCategory(category) {
  const allProducts = productsContainer.querySelectorAll(".shop-position");
  allProducts.forEach((product) => {
    if (
      product.getAttribute("data-category") === category ||
      category === "all"
    ) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}
