
const carrusel = document.getElementById("carouselExampleIndicators");


let slider = null;

if (carrusel) {
    slider = new bootstrap.Carousel(carrusel, {
        interval: 3000,   
        ride: "carousel", 
        pause: false
    });


    carrusel.addEventListener("mouseenter", () => {
        slider.pause();
    });


    carrusel.addEventListener("mouseleave", () => {
        slider.cycle();
    });
}

const indicadores = document.querySelectorAll(".carousel-indicators button");

indicadores.forEach((btn, indice) => {
    btn.addEventListener("click", () => {
        if (slider) slider.to(indice);
    });
});
