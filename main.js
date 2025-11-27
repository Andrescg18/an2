// =======================
// VARIABLES GLOBALES
// =======================
let reservas = [];

const registerSend = document.getElementById("registerSend");
const loginSend = document.getElementById("loginSend");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const overlay = document.getElementById("overlay");
const loginBtn = document.getElementById("loginBtn");
const welcomeBox = document.getElementById("welcomeBox");
const msgSuccess = document.createElement("div");
msgSuccess.classList.add("msg-success");
msgSuccess.textContent = "¡Registro exitoso!";
msgSuccess.style.display = "none";
document.body.appendChild(msgSuccess);

const openRegisterLink = document.getElementById("openRegister");
const backToLoginLink = document.getElementById("backToLogin");
const closeLogin = document.getElementById("closeLogin");
const closeRegister = document.getElementById("closeRegister");

// =======================
// FUNCIONES UTILES
// =======================
function validarCorreo(correo) {
    return /\S+@\S+\.\S+/.test(correo);
}

function validarTelefono(tel) {
    return /^\d{7,15}$/.test(tel);
}

function showModal(modal) {
    modal.style.display = "block";
    overlay.style.display = "block";
}

function hideModal(modal) {
    modal.style.display = "none";
    overlay.style.display = "none";
}

// =======================
// MODALES
// =======================
loginBtn?.addEventListener("click", () => showModal(loginModal));
openRegisterLink?.addEventListener("click", () => {
    hideModal(loginModal);
    showModal(registerModal);
});
backToLoginLink?.addEventListener("click", () => {
    hideModal(registerModal);
    showModal(loginModal);
});
closeLogin?.addEventListener("click", () => hideModal(loginModal));
closeRegister?.addEventListener("click", () => hideModal(registerModal));
overlay?.addEventListener("click", () => {
    hideModal(loginModal);
    hideModal(registerModal);
});

// =======================
// ELEMENTOS
// =======================
const loginContainer = document.getElementById("loginContainer");
const registroContainer = document.getElementById("registroContainer");
const app = document.getElementById("app");

const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");
const regUser = document.getElementById("regUser");
const regPass = document.getElementById("regPass");

// =======================
// LOGIN / REGISTRO
// =======================
function mostrarRegistro() {
  loginContainer.style.display = "none";
  registroContainer.style.display = "block";
}

function mostrarLogin() {
  registroContainer.style.display = "none";
  loginContainer.style.display = "block";
}

function registrar() {
  if (!regUser.value || !regPass.value) return alert("Completa todo.");
  localStorage.setItem("user", regUser.value);
  localStorage.setItem("pass", regPass.value);
  alert("Cuenta creada");
  mostrarLogin();
}

function login() {
  if (
    loginUser.value === localStorage.getItem("user") &&
    loginPass.value === localStorage.getItem("pass")
  ) {
    loginContainer.style.display = "none";
    registroContainer.style.display = "none";
    app.style.display = "block";
  } else alert("Error en datos");
}

function logout() {
  app.style.display = "none";
  loginContainer.style.display = "block";
}

// =======================
// CAMBIO DE VISTAS
// =======================
function cambiarVista(vista) {
  document.querySelectorAll(".vista").forEach((s) => s.classList.remove("activa"));
  document.getElementById(vista).classList.add("activa");
}
 const abrir = document.getElementById("abrirModal");
    const modal = document.getElementById("modalLogin");
    const cerrar = document.getElementById("cerrarModal");

    abrir.onclick = () => modal.style.display = "block";
    cerrar.onclick = () => modal.style.display = "none";

    window.onclick = (e) => {
        if (e.target == modal) { 
            modal.style.display = "none";
        }
    };