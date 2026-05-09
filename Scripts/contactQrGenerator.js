function generateContactQr() {
    new QRCode(document.getElementById('linkedin-qr'), {
        text: "https://www.linkedin.com/in/gabriel-sorica-b30645227/",
        width: 128,
        height: 128
    });

    new QRCode(document.getElementById('github-qr'), {
        text: "https://github.com/Gabbrov1",
        width: 128,
        height: 128
    });
}

generateContactQr();