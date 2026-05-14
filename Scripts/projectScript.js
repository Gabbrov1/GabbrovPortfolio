import {getRandomImage,getColorFromSeed,renderIcons} from './helpers.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
    window.location.href = '/Pages/projects.html';
}

async function setupMarked() {
    const emojiRes = await fetch('https://api.github.com/emojis');
    const emojis = await emojiRes.json();
    marked.use(markedEmoji.markedEmoji({ emojis, unicode: true }));
}

async function loadProject(id) {
    const res = await fetch(`https://api.github.com/repos/Gabbrov1/${id}`);
    const repo = await res.json();

    document.getElementById('project-title').textContent = repo.name;
    document.getElementById('project-description').textContent = repo.description;
    document.getElementById('project-language').textContent = repo.language;
    document.getElementById('project-stars').innerHTML  = renderIcons(repo.stargazers_count);

    document.getElementById('project-link').href = repo.html_url;

    // Topics
    const topicsContainer = document.getElementById('project-topics');
    repo.topics.forEach(topic => {
            const badge = document.createElement('span');
            badge.textContent = topic;
            badge.classList.add('topic-badge');
            badge.style.backgroundColor = getColorFromSeed(topic);
            topicsContainer.appendChild(badge);
        });

    // README
    const readmeRes = await fetch(`https://api.github.com/repos/Gabbrov1/${id}/readme`);
    const readmeData = await readmeRes.json();
    const readmeContent = decodeURIComponent(
        atob(readmeData.content.replace(/\n/g, ''))
            .split('')
            .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
            .join('')
    );

    document.getElementById('project-readme').innerHTML = marked.parse(readmeContent);
}

async function init() {
    await setupMarked();  // setup emoji before parsing
    await loadProject(id);
}

init();