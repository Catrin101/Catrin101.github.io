function initSkills() {
    const skillsContainer = document.getElementById('skills-container');
    
    Object.entries(skills).forEach(([key, skill]) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-category';
        skillCard.innerHTML = `
            <h3><i class="${skill.icon}"></i> ${skill.title}</h3>
            <div class="skills-list">
                ${skill.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
            </div>
        `;
        skillsContainer.appendChild(skillCard);
    });
}
