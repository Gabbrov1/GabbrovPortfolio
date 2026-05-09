export default function createImageCard(imageName, altText) {
    const card = document.createElement('div');
    card.classList.add('image-card');

    const img = document.createElement('img');
    img.src = `https://2adfbnig40.execute-api.eu-west-2.amazonaws.com/Deployment/images/${imageName}`;
    img.alt = altText;
    card.appendChild(img);
    return card;
}