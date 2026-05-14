export default function createImageCard(imageName, altText,link=false) {
    const card = document.createElement('div');
    card.classList.add('image-card');

    const img = document.createElement('img');

    //The link is used in case there is no available image
    if(link){
        img.src = imageName;
    }
    else{
        img.src = `https://2adfbnig40.execute-api.eu-west-2.amazonaws.com/Deployment/images/${imageName}`;
    }
    
    img.alt = altText;
    card.appendChild(img);
    return card;
}