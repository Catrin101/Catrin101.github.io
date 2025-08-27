function initContact() {
    document.getElementById('contact-email').textContent = personalInfo.email;
    document.getElementById('contact-phone').textContent = personalInfo.phone;
    document.getElementById('contact-location').textContent = personalInfo.location;

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;
        
        window.open(mailtoLink);
        form.reset();
        alert('¡Gracias por tu mensaje! Se abrirá tu cliente de email.');
    });

    const footerSocial = document.getElementById('footer-social');
    footerSocial.innerHTML = `
        <a href="${personalInfo.social.github}" class="social-link" target="_blank" title="GitHub">
            <i class="fab fa-github"></i>
        </a>
        <a href="${personalInfo.social.linkedin}" class="social-link" target="_blank" title="LinkedIn">
            <i class="fab fa-linkedin"></i>
        </a>
        <a href="${personalInfo.social.twitter}" class="social-link" target="_blank" title="Twitter">
            <i class="fab fa-twitter"></i>
        </a>
    `;
}
