function initExperience() {
    const timeline = document.getElementById('experience-timeline');
    
    experience.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <div class="company">${exp.company}</div>
                <div class="date">${exp.period}</div>
                <ul>
                    ${exp.description.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}
