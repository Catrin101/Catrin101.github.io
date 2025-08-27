function initHero() {
    document.getElementById('hero-name').textContent = personalInfo.name.split(' ')[0] + ' ' + personalInfo.name.split(' ')[1];
    document.getElementById('hero-subtitle').textContent = personalInfo.title;
    document.getElementById('hero-description').textContent = personalInfo.description;

    const heroSocial = document.getElementById('hero-social');
    heroSocial.innerHTML = `
        <a href="${personalInfo.social.github}" class="social-link" target="_blank" title="GitHub">
            <i class="fab fa-github"></i>
        </a>
        <a href="${personalInfo.social.linkedin}" class="social-link" target="_blank" title="LinkedIn">
            <i class="fab fa-linkedin"></i>
        </a>
        <a href="${personalInfo.social.twitter}" class="social-link" target="_blank" title="Twitter">
            <i class="fab fa-twitter"></i>
        </a>
        <a href="${personalInfo.social.email}" class="social-link" title="Email">
            <i class="fas fa-envelope"></i>
        </a>
    `;

    const subtitle = document.getElementById('hero-subtitle');
    const titles = [
        personalInfo.title,
        personalInfo.subtitle,
        "Especialista en Bases de Datos",
        "Desarrollador Full-Stack"
    ];
    let currentTitle = 0;

    function typeTitle() {
        const current = titles[currentTitle];
        subtitle.textContent = current;
        currentTitle = (currentTitle + 1) % titles.length;
    }

    setInterval(typeTitle, 3000);
}
