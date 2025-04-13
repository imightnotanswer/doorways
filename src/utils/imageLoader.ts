// Function to import all images from the assets/images directory
export const loadImages = async () => {
    const images: string[] = [];
    const imageContext = import.meta.glob('../assets/images/*');

    for (const path in imageContext) {
        try {
            const module = await imageContext[path]() as { default: string };
            images.push(module.default);
        } catch (error) {
            console.error(`Error loading image: ${path}`, error);
        }
    }

    return images;
};

// Function to get a random position within viewport bounds
export const getRandomPosition = (imageWidth: number, imageHeight: number) => {
    const margin = 50; // Minimum distance from edges
    const maxX = window.innerWidth - imageWidth - margin;
    const maxY = window.innerHeight - imageHeight - margin;

    return {
        x: margin + Math.random() * maxX,
        y: margin + Math.random() * maxY,
    };
};

// Function to check if two positions overlap
export const checkOverlap = (pos1: { x: number, y: number }, pos2: { x: number, y: number }, size: number = 200) => {
    const buffer = size * 0.3; // 30% of image size as minimum spacing
    return Math.abs(pos1.x - pos2.x) < buffer && Math.abs(pos1.y - pos2.y) < buffer;
}; 