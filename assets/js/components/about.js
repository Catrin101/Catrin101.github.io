function initAbout() {
    document.getElementById('about-description').textContent = personalInfo.description;
    document.getElementById('personal-location').textContent = personalInfo.location;
    document.getElementById('personal-email').textContent = personalInfo.email;
    document.getElementById('personal-phone').textContent = personalInfo.phone;
    document.getElementById('personal-education').textContent = personalInfo.education;

    document.getElementById('experience-years').textContent = '5+';
    document.getElementById('projects-count').textContent = `${projects.length}+`;
    document.getElementById('technologies-count').textContent = 
        `${Object.keys(skills).reduce((acc, key) => acc + skills[key].items.length, 0)}+`;
}
