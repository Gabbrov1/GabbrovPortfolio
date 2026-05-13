import { getImageFromS3 } from './awsIntegration.js';
import createImageCard from './basicImageCard.js';

import {getRandomImage,getColorFromSeed} from './helpers.js';

let allProjects = [];

async function loadProjects() {
    const projectList = document.getElementById('project-list');

    allProjects = await getProjectsFromGit();

    if (allProjects === null || allProjects.length === 0) {
        throw new Error("Could not load any Github Projects.");
    }

    renderProjects(allProjects);
}

function renderProjects(projects) {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    projects.forEach(project => {
        const projectContainer = document.createElement('div');
        const HeaderContainer = document.createElement('div');
        const BodyContainer = document.createElement('div');

        const projectTitle = document.createElement('h3');
        const descriptionText = document.createElement('p');
        const topicsContainer = document.createElement('div');

        const hasImage = !!project.imageName;
        const imageElement = createImageCard(hasImage ? project.imageName : getRandomImage(), project.name, !hasImage);
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        project.topics.forEach(topic => {
            const badge = document.createElement('span');
            badge.textContent = topic;
            badge.classList.add('topic-badge');
            badge.style.backgroundColor = getColorFromSeed(topic);
            topicsContainer.appendChild(badge);
        });

        HeaderContainer.classList.add('project-header');
        BodyContainer.classList.add('project-body');
        topicsContainer.classList.add('project-topics');
        link.classList.add('project-link');
        imageElement.classList.add('project-image');
        listItem.classList.add('project-item');

        projectTitle.textContent = project.name;
        descriptionText.textContent = project.description;
        link.href = `project.html?id=${project.name}`;

        HeaderContainer.appendChild(projectTitle);
        BodyContainer.appendChild(descriptionText);
        BodyContainer.appendChild(topicsContainer);
        BodyContainer.appendChild(imageElement);

        projectContainer.appendChild(HeaderContainer);
        projectContainer.appendChild(BodyContainer);

        link.appendChild(projectContainer);
        listItem.appendChild(link);
        projectList.appendChild(listItem);
    });
}

function filterResults(searchTerm = '', language = '') {
    const filtered = allProjects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
            || project.description?.toLowerCase().includes(searchTerm.toLowerCase())
            || project.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesLanguage = language === '' || project.language === language;

        return matchesSearch && matchesLanguage;
    });

    renderProjects(filtered);
}

async function getProjectsFromGit() {
    const username = 'Gabbrov1';

    const res = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: { 'Accept': 'application/vnd.github.mercy-preview+json' }
    });
    const repos = await res.json();

    return repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        url: repo.html_url,
        topics: repo.topics ?? [],
    }));
}




await loadProjects();

window.filterResults = filterResults;