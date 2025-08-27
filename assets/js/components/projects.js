function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    const sortedProjects = projects.sort((a, b) => b.featured - a.featured);
    
    sortedProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <i class="${project.image}"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i> Código
                    </a>
                    <a href="${project.demo}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}
