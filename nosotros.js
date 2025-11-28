
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        if (link.textContent.trim() === "Nosotros") {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    const container = document.querySelector(".container");
    if (container) {
        container.style.opacity = "0";
        container.style.transition = "opacity 1s ease";

        setTimeout(() => {
            container.style.opacity = "1";
        }, 100);
    }


    const titles = document.querySelectorAll("h4");

    titles.forEach(title => {
        title.style.cursor = "pointer";

        title.addEventListener("mouseenter", () => {
            title.style.color = "#d63384"; // rosado elegante
            title.style.transition = "0.3s";
        });

        title.addEventListener("mouseleave", () => {
            title.style.color = "black";
        });
    });
});
