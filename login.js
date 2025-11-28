
document.addEventListener("DOMContentLoaded", () => {

  const loginContainer = document.getElementById("loginContainer");
  const registroContainer = document.getElementById("registroContainer");
  const appContainer = document.getElementById("app");

  const loginUser = document.getElementById("loginUser");
  const loginPass = document.getElementById("loginPass");
  const regUser = document.getElementById("regUser");
  const regPass = document.getElementById("regPass");


  window.addEventListener("open-login-modal", () => {
    if (loginContainer) showLogin();
  });


  window.mostrarRegistro = showRegistro;
  window.mostrarLogin = showLogin;

  function showLogin() {
    if (loginContainer) loginContainer.style.display = "block";
    if (registroContainer) registroContainer.style.display = "none";
    if (appContainer) appContainer.style.display = "none";
  }
  function showRegistro() {
    if (loginContainer) loginContainer.style.display = "none";
    if (registroContainer) registroContainer.style.display = "block";
    if (appContainer) appContainer.style.display = "none";
  }
  function showApp(user) {
    if (loginContainer) loginContainer.style.display = "none";
    if (registroContainer) registroContainer.style.display = "none";
    if (appContainer) {
      appContainer.style.display = "block";
      // colocar nombre de usuario si existe
      const welcome = appContainer.querySelector(".welcome-user");
      if (welcome) welcome.textContent = `Bienvenido, ${user}`;
    }
  }


  function loadUsers() {
    return JSON.parse(localStorage.getItem("skylux_users") || "{}");
  }
  function saveUsers(users) {
    localStorage.setItem("skylux_users", JSON.stringify(users));
  }


  if (regUser && regPass) {
    const btnCreate = registroContainer?.querySelector("button");
    if (btnCreate) {
      btnCreate.addEventListener("click", (e) => {
        e.preventDefault();
        const user = regUser.value.trim();
        const pass = regPass.value.trim();
        if (!user || !pass) { alert("Completa usuario y contraseña"); return; }
        const users = loadUsers();
        if (users[user]) { alert("Usuario ya existe"); return; }
        users[user] = { pass };
        saveUsers(users);
        alert("Cuenta creada. Inicia sesión.");
        showLogin();
      });
    }
  }


  if (loginUser && loginPass) {
    const btnLogin = loginContainer?.querySelector("button");
    if (btnLogin) {
      btnLogin.addEventListener("click", (e) => {
        e.preventDefault();
        const user = loginUser.value.trim();
        const pass = loginPass.value.trim();
        if (!user || !pass) { alert("Completa usuario y contraseña"); return; }
        const users = loadUsers();
        if (users[user] && users[user].pass === pass) {
          localStorage.setItem("skylux_current_user", user);
          showApp(user);
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      });
    }
  }


  window.logout = function () {
    localStorage.removeItem("skylux_current_user");
    showLogin();
  };

  
  const current = localStorage.getItem("skylux_current_user");
  if (current) showApp(current); else showLogin();

  window.cambiarVista = function (id) {
    document.querySelectorAll(".vista").forEach(v => v.classList.remove("activa"));
    const el = document.getElementById(id);
    if (el) el.classList.add("activa");
  };
});
