function generateNavBar() {
    //NavBar Creation
    const navPlaceholder = document.getElementById('nav-placeholder');

    const navBar = document.createElement('nav');
    const navList = document.createElement('ul');
    
    navBar.classList.add('navbar');
    
    const navItems = [
        { name: 'Home', link: 'home.html' },
        { name: 'Projects', link: 'projects.html' },
        { name: 'About', link: 'about.html' },
        { name: 'Contact', link: 'contact.html' },
        { name: 'Resume', link: 'resume.html' }
    ];
    
    const currentPage = window.location.pathname.split('/').pop();
    
    navItems.forEach(item => {
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        
        if (item.link === currentPage) {
            link.classList.add('active');
        }
        
        listItem.classList.add('nav-item');

        link.href = item.link;
        link.textContent = item.name;
        
        listItem.appendChild(link);
        navList.appendChild(listItem);
    });

    navBar.appendChild(navList);
    navPlaceholder.appendChild(navBar);
}



generateNavBar();