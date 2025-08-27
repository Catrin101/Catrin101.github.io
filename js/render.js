import { portfolioData } from './data.js';

function renderPersonalInfo() {
    document.querySelector('.name').textContent = portfolioData.personal.name;
    document.querySelector('.title').textContent = portfolioData.personal.title;
    document.querySelector('.highlight').textContent = portfolioData.personal.highlight;
}

function renderAdvantages() {
    const advantagesContainer = document.querySelector('.advantages');
    advantagesContainer.innerHTML = portfolioData.advantages.map(adv => `
        <div class="advantage" ${adv.type === 'modal' ? 
            `onclick="openModal('${adv.id}')"` : 
            `onclick="window.open('${adv.id}', '_blank')"`}>
            <div class="click-hint">${adv.hint}</div>
            <div class="advantage-title">${adv.icon} ${adv.title}</div>
            <div class="advantage-subtitle">${adv.subtitle}</div>
        </div>
    `).join('');
}

function renderTechStack() {
    const techContainer = document.querySelector('.tech-tags');
    techContainer.innerHTML = portfolioData.techStack
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
}

function renderContact() {
    const contact = portfolioData.personal.contact;
    document.querySelector('.contact-title').textContent = contact.title;
    document.querySelector('.contact-info').innerHTML = `
        <div class="contact-item">
            <span>📞</span>
            <span>${contact.phone}</span>
        </div>
        <div class="contact-item">
            <span>📧</span>
            <span>${contact.email}</span>
        </div>
        <div class="contact-item">
            <span>📍</span>
            <span>${contact.location}</span>
        </div>
    `;
}

function renderModals() {
    renderExperienceModal();
    renderFullStackModal();
    renderResultsModal();
}

function renderExperienceModal() {
    const container = document.querySelector('#experienceModal .modal-content');
    container.innerHTML = `
        <span class="close" onclick="closeModal('experienceModal')">&times;</span>
        <h2 class="modal-title">💼 Experiencia Profesional</h2>
        ${portfolioData.experience.map(exp => `
            <div class="experience-item">
                <div class="experience-title">${exp.title}</div>
                <div class="experience-company">${exp.company}</div>
                <div class="experience-date">${exp.date}</div>
                <ul class="experience-duties">
                    ${exp.duties.map(duty => `<li>${duty}</li>`).join('')}
                </ul>
            </div>
        `).join('')}
    `;
}

function renderFullStackModal() {
    const container = document.querySelector('#fullStackModal .modal-content');
    container.innerHTML = `
        <span class="close" onclick="closeModal('fullStackModal')">&times;</span>
        <h2 class="modal-title">${portfolioData.fullStack.title}</h2>
        <p style="color: #8b4513; text-align: center; font-size: 1.1em; line-height: 1.6;">
            ${portfolioData.fullStack.skills.map(skill => `
                <strong>${skill.area}:</strong> ${skill.details}<br><br>
            `).join('')}
        </p>
    `;
}

function renderResultsModal() {
    const container = document.querySelector('#resultsModal .modal-content');
    container.innerHTML = `
        <span class="close" onclick="closeModal('resultsModal')">&times;</span>
        <h2 class="modal-title">${portfolioData.results.title}</h2>
        <p style="color: #8b4513; text-align: center; font-size: 1.1em; line-height: 1.6;">
            ${portfolioData.results.points.map(point => `
                <strong>${point.title}:</strong> ${point.details}<br><br>
            `).join('')}
        </p>
    `;
}

export function initializeContent() {
    renderPersonalInfo();
    renderAdvantages();
    renderTechStack();
    renderContact();
    renderModals();
}