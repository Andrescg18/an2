
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    if (link.href.includes("videos")) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});


const videos = document.querySelectorAll(".ratio");

videos.forEach(video => {
    video.style.opacity = "0";
    video.style.transform = "translateY(20px)";
});

window.addEventListener("load", () => {
    videos.forEach((video, i) => {
        setTimeout(() => {
            video.style.transition = "0.6s ease";
            video.style.opacity = "1";
            video.style.transform = "translateY(0)";
        }, i * 200);
    });
});


const iframes = document.querySelectorAll("iframe");

iframes.forEach((frame, i) => {
    frame.addEventListener("error", () => {
        frame.insertAdjacentHTML(
            "afterend",
            `<p class="text-danger mt-2">⚠ Error al cargar el video ${i + 1}</p>`
        );
    });
});


function agregarVideo(url, titulo) {
    const container = document.querySelector(".row");

    const nuevo = document.createElement("div");
    nuevo.classList.add("col-md-6", "col-lg-4");

    nuevo.innerHTML = `
        <div class="ratio ratio-16x9">
            <iframe src="${url}" allowfullscreen></iframe>
        </div>
        <h5 class="mt-2">${titulo}</h5>
    `;

    container.appendChild(nuevo);
}
