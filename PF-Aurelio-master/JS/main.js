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
  closeCartButton.innerHTML = "&#10005;"; // X en HTML
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

  cartTitle.appendChild(closeCartButton); // Agrega el botón de cerrar al título

  const buttons = document.querySelectorAll(
    ".btn-bestseller, .btn-bestseller2, .btn-shop, .btn-shop2, .btn-shop3, .sf-button"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const product = {
        name: e.target.closest("article").querySelector("h3").innerText,
        price: parseFloat(
          e.target
            .closest("article")
            .querySelector("h4")
            .innerText.replace("$", "")
        ),
        quantity: 1,
      };
      addToCart(product);
    });
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
    alert("Finalizando compra...");
    // Aquí puedes agregar la lógica para redirigir a una página de pago o finalizar la compra
  });

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
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
