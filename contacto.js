

const form = document.getElementById('contactForm');
const feedback = document.getElementById('feedback');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();


    if (!name || !email || !message) {
        feedback.className = 'alert alert-danger mt-3';
        feedback.textContent = 'Por favor completa todos los campos.';
        feedback.classList.remove('d-none');
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        feedback.className = 'alert alert-danger mt-3';
        feedback.textContent = 'Ingresa un correo válido.';
        feedback.classList.remove('d-none');
        return;
    }

   
    const contacto = {
        name,
        email,
        message,
        fecha: new Date().toLocaleString()
    };

    let mensajes = JSON.parse(localStorage.getItem('contactos')) || [];
    mensajes.push(contacto);
    localStorage.setItem('contactos', JSON.stringify(mensajes));

    feedback.className = 'alert alert-success mt-3';
    feedback.textContent = 'Mensaje enviado correctamente. ¡Gracias por contactarnos!';
    feedback.classList.remove('d-none');

    form.reset();
});
