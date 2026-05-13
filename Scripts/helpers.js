// ------------------------------------Helpers-------------------------------------
export function getRandomImage() {
    const randomSeed = Math.floor(Math.random() * 999999);
    return `https://picsum.photos/seed/${randomSeed}/300/200`;
}

export function getColorFromSeed(str) {
    const hash = [...str].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    const saturation = 60 + (hash % 20); // 60-80%
    const lightness = 35 + (hash % 20);  // 35-55%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}