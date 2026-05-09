window.location.href = './Pages/home.html';



function redirectToHome(timer) {
    setTimeout(() => {
        window.location.href = './Pages/home.html';
    }, timer);
    redirectToHome(timer);
}

redirectToHome(1000);