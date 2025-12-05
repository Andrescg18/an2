document.addEventListener("DOMContentLoaded", () => {


  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const boxLogin = document.getElementById("boxLogin");
  const boxRegister = document.getElementById("boxRegister");

  tabLogin?.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");

    boxLogin.classList.remove("d-none");
    boxRegister.classList.add("d-none");
  });

  tabRegister?.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");

    boxRegister.classList.remove("d-none");
    boxLogin.classList.add("d-none");
  });


  const escapeHtml = (str = "") =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");




  const btnLogin = document.getElementById("btnLogin");
  const loginSend = document.getElementById("loginSend");
  const registerSend = document.getElementById("registerSend");

  const authModal = new bootstrap.Modal(document.getElementById("authModal"));



  btnLogin?.addEventListener("click", () => {
    authModal.show();
    tabLogin.click();
  });



  registerSend?.addEventListener("click", () => {
    const user = {
      nombres: document.getElementById("regNombres").value.trim(),
      apellidos: document.getElementById("regApellidos").value.trim(),
      correo: document.getElementById("regCorreo").value.trim(),
      telefono: document.getElementById("regTelefono").value.trim(),
      password: document.getElementById("regPassword").value.trim(),
    };

    if (!user.nombres || !user.apellidos || !user.correo || !user.password) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    localStorage.setItem("skylux_user", JSON.stringify(user));

    alert("Registro exitoso. ¡Bienvenido!");
    tabLogin.click();
  });




  loginSend?.addEventListener("click", () => {
    const correo = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    const user = JSON.parse(localStorage.getItem("skylux_user"));

    if (!user) {
      alert("No hay una cuenta registrada.");
      return;
    }

if (correo === user.correo && pass === user.password) {

      authModal.hide();

      // Guardar sesión activa
      localStorage.setItem("skylux_logged", "true");

      // Redirigir al dashboard
      window.location.href = "dashboard.html";

} else {
      alert("Credenciales incorrectas.");
}

  });




  const listaReservas = document.getElementById("listaReservas");

  function renderReservas() {
    if (!listaReservas) return;

    const reservas = JSON.parse(localStorage.getItem("skylux_reservas") || "[]");

    listaReservas.innerHTML = reservas.length
      ? reservas
          .map(
            (r, index) =>
              `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>${escapeHtml(r.nombre)}</strong> —
                  ${escapeHtml(r.servicio)} —
                  ${escapeHtml(r.comentario)}
                </span>

                <button class="btn btn-danger btn-sm eliminar-reserva"
                  data-index="${index}">
                  <i class="bi bi-trash"></i>
                </button>
              </li>`
          )
          .join("")
      : `<li class="list-group-item text-muted">No hay reservas aún</li>`;

    document.querySelectorAll(".eliminar-reserva").forEach(btn => {
      btn.addEventListener("click", () => eliminarReserva(btn.dataset.index));
    });
  }

  function eliminarReserva(index) {
    let reservas = JSON.parse(localStorage.getItem("skylux_reservas") || "[]");
    reservas.splice(index, 1);
    localStorage.setItem("skylux_reservas", JSON.stringify(reservas));
    renderReservas();
  }

  renderReservas();




  document.querySelectorAll("[data-bs-target='#modalReserva']").forEach(btn => {
    btn.addEventListener("click", e => {
      const servicio = btn.getAttribute("data-service");
      document
        .querySelector("#modalReserva .modal-title")
        .innerHTML = "Reservar " + servicio;

      document
        .getElementById("modalReserva")
        .setAttribute("data-servicio", servicio);
    });
  });

  document
    .querySelector("#modalReserva .btn.btn-warning")
    ?.addEventListener("click", () => {
      const nombre = document.querySelector("#modalReserva input[type=text]").value;
      const correo = document.querySelector("#modalReserva input[type=email]").value;
      const comentario = document.querySelector("#modalReserva textarea").value;

      const servicio = document
        .getElementById("modalReserva")
        .getAttribute("data-servicio");

      if (!nombre || !correo) {
        alert("Nombre y correo son obligatorios.");
        return;
      }

      const reservas = JSON.parse(localStorage.getItem("skylux_reservas") || "[]");

      reservas.push({
        nombre,
        correo,
        comentario,
        servicio,
      });

      localStorage.setItem("skylux_reservas", JSON.stringify(reservas));

      renderReservas();
      alert("Reserva enviada correctamente.");

      document.querySelector("#modalReserva input[type=text]").value = "";
      document.querySelector("#modalReserva input[type=email]").value = "";
      document.querySelector("#modalReserva textarea").value = "";
    });




  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    document.getElementById("userPanel").classList.add("d-none");
    alert("Sesión cerrada.");
  });

  document.getElementById("deleteAccountBtn")?.addEventListener("click", () => {
    if (confirm("¿Seguro que deseas eliminar tu cuenta?")) {
      localStorage.removeItem("skylux_user");
      document.getElementById("userPanel").classList.add("d-none");
      alert("Cuenta eliminada.");
    }
  });

});




function agregarReserva(nombre, fecha) {
  const lista = document.getElementById("listaReservas");

  const item = document.createElement("li");
  item.className = "list-group-item d-flex justify-content-between align-items-center";

  item.innerHTML = `
    <span><strong>${nombre}</strong> - ${fecha}</span>
    <button class="btn btn-danger btn-sm eliminar-reserva">
      <i class="bi bi-trash"></i>
    </button>
  `;

  lista.appendChild(item);

  item.querySelector(".eliminar-reserva").addEventListener("click", () => {
    item.remove();
  });
}
