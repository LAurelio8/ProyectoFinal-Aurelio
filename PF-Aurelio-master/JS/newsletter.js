document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("success-modal");
  var btn = document.querySelector(".btn-news");
  var span = document.querySelector(".close");

  // Cuando el usuario hace clic en el botón "Guardar"
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // Cuando el usuario hace clic en el botón "x" para cerrar el modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Cuando el usuario hace clic fuera del modal, lo cierra
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
