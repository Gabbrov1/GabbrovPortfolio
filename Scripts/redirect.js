
function redirect() {
    const homeLink = '/Pages/home.html';

    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/index.html') {
        window.location.href = homeLink;
    }
}

redirect();