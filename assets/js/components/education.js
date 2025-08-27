function initEducation() {
    const educationContainer = document.getElementById('education-container');
    
    education.forEach(edu => {
        const eduCard = document.createElement('div');
        eduCard.className = 'education-card';
        eduCard.innerHTML = `
            <h3>${edu.degree}</h3>
            <div class="institution">${edu.institution}</div>
            <div class="period">${edu.period} ${edu.status ? `• ${edu.status}` : ''}</div>
            <p>Formación especializada en desarrollo de sistemas computacionales, programación avanzada y tecnologías emergentes.</p>
            ${edu.url ? `<a href="${edu.url}" target="_blank" class="btn btn-secondary" style="margin-top: 1rem;">Ver Programa</a>` : ''}
        `;
        educationContainer.appendChild(eduCard);
    });
}
