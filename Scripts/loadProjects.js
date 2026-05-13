import { getImageFromS3 } from './awsIntegration.js';
import createImageCard from './basicImageCard.js';


async function loadProjects() {
    const projectList = document.getElementById('project-list');

    const projects = await getProjectsFromGit();

    if(projects === null || projects.length === 0 ){
        throw console.error("Could not load any Github Projects.");        
    }
    projects.forEach(project => {
        
        //Divs
        const projectContainer = document.createElement('div');
        const HeaderContainer = document.createElement('div');
        const BodyContainer = document.createElement('div');
        
        //Elements
        const projectTitle = document.createElement('h3');
        const descriptionText = document.createElement('p');
        
        const hasImage = !!project.imageName;
        const imageElement = createImageCard(hasImage ? project.imageName : getRandomImage(), project.name, !hasImage);
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        
        // Add classes for styling
        HeaderContainer.classList.add('project-header');
        BodyContainer.classList.add('project-body');
        link.classList.add('project-link');
        imageElement.classList.add('project-image');
        listItem.classList.add('project-item');

        
        // Set content and attributes
        projectTitle.textContent = project.name;
        descriptionText.textContent = project.description;
        
        // Set the link URL (if available)
        link.href = project.url;
        
        
        // Adding Elements to the DOM
        HeaderContainer.appendChild(projectTitle);
        BodyContainer.appendChild(descriptionText);
        BodyContainer.appendChild(imageElement);
        
        projectContainer.appendChild(HeaderContainer);
        projectContainer.appendChild(BodyContainer);

        
        link.appendChild(projectContainer);
        listItem.appendChild(link);
        projectList.appendChild(listItem);
        
    });
}

async function getProjectsFromGit(){
    const username = 'Gabbrov1'; // change this
    
    const githubUrl = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await githubUrl.json();
    
    const output = repos.map(repo => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    url: repo.html_url,
    }));
    
    //console.log(JSON.stringify(output, null, 2)); //Testing

    return output
}

// Used in case the current project does not have an image attached.
function getRandomImage() {
    const randomSeed = Math.floor(Math.random() * 999999);
    return `https://picsum.photos/seed/${randomSeed}/300/200`;
}

await loadProjects();