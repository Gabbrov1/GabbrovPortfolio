import { getImageFromS3 } from './awsIntegration.js';
import createImageCard from './basicImageCard.js';

function loadProjects() {
    const projectList = document.getElementById('project-list');

    const projects = [
        {
            name: 'Project One',
            description: 'A brief description of Project One.',
            link: '',
            imageName: 'project-one.jpg'
        },
        {
            name: 'Project Two',
            description: 'A brief description of Project Two.',
            link: '',
            imageName: 'project-two.jpg'
        },
        {
            name: 'Project Three',
            description: 'A brief description of Project Three.',
            link: '',
            imageName: 'project-three.jpg'
        }
    ];

    projects.forEach(project => {
        
        //Divs
        const projectContainer = document.createElement('div');
        const HeaderContainer = document.createElement('div');
        const BodyContainer = document.createElement('div');
        
        //Elements
        const projectTitle = document.createElement('h3');
        const descriptionText = document.createElement('p');
        const imageElement = createImageCard(project.imageName, project.name);
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
        link.href = project.link;
        
        
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

loadProjects();