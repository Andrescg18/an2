


const botonesVerMas = document.querySelectorAll(".btn.btn-warning");

botonesVerMas.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Pronto podrás ver más detalles de esta agenda.");
  });
});


window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 20) {
    nav.classList.add("shadow-sm");
  } else {
    nav.classList.remove("shadow-sm");
  }
});
