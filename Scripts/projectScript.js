const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
    // No id in the URL, redirect back to projects list
    window.location.href = '/Pages/projects.html';
}

async function loadProject(id) {
    const res = await fetch(`https://api.github.com/repos/Gabbrov1/${id}`);
    const repo = await res.json();

    // Populate the page
    document.getElementById('project-title').textContent = repo.name;
    document.getElementById('project-description').textContent = repo.description;
    document.getElementById('project-language').textContent = repo.language;
    document.getElementById('project-stars').textContent = repo.stargazers_count;
    document.getElementById('project-link').href = repo.html_url;

    // Topics
    const topicsContainer = document.getElementById('project-topics');
    repo.topics.forEach(topic => {
        const badge = document.createElement('span');
        badge.textContent = topic;
        badge.classList.add('topic-badge');
        topicsContainer.appendChild(badge);
    });

    // README
    const readmeRes = await fetch(`https://api.github.com/repos/Gabbrov1/${id}/readme`);
    const readmeData = await readmeRes.json();
    const readmeContent = atob(readmeData.content.replace(/\n/g, ''));
    document.getElementById('project-readme').innerHTML = marked.parse(readmeContent);
}

loadProject(id);