document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("success-modal");
  var btn = document.querySelector(".btn-news");
  var span = document.querySelector(".close");
  var emailInput = document.getElementById("email");

  btn.onclick = function () {
    if (!emailInput.value || !emailInput.checkValidity()) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un correo electrónico válido.",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "¡Gracias por suscribirte a nuestra newsletter!",
        text: "Próximamente recibirás novedades importantes",
        icon: "success",
      });
    }
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
