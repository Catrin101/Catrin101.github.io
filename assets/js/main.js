document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initHero();
    initAbout();
    initSkills();
    initExperience();
    initEducation();
    initProjects();
    initContact();
    initAnimations();

    setTimeout(() => {
        document.querySelectorAll('.loading').forEach(el => {
            el.classList.remove('loading');
        });
    }, 500);

    console.log('Portfolio cargado correctamente ✨');
});

document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        hero.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.1) 0%, transparent 50%)`;
    }
});
