import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

interface CollageOverlayProps {
    isActive: boolean;
}

interface ImagePosition {
    src: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    zIndex: number;
    key: string;
    index: number;
}

const MAX_ACTIVE_IMAGES = 25; // Reduced to 25 images
const IMAGES_PER_CLEANUP = 6; // Adjusted cleanup batch size

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1000;
    isolation: isolate;
    will-change: transform;
`;

const Image = styled(motion.img) <{ $zIndex: number }>`
    position: absolute;
    max-width: min(400px, 40vw);
    height: auto;
    object-fit: cover;
    z-index: ${props => props.$zIndex};
    filter: contrast(1.1);
    will-change: transform;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;

    @media (max-width: 768px) {
        max-width: min(300px, 45vw);
    }

    @media (max-width: 480px) {
        max-width: min(250px, 50vw);
    }
`;

const getRandomPosition = (size: number) => {
    const margin = size * 0.2;
    const maxX = window.innerWidth - size - margin;
    const maxY = window.innerHeight - size - margin;

    return {
        x: margin + Math.random() * maxX,
        y: margin + Math.random() * maxY
    };
};

export const CollageOverlay: React.FC<CollageOverlayProps> = ({ isActive }) => {
    const [images, setImages] = useState<ImagePosition[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageCache = useRef<{ [key: string]: HTMLImageElement }>({});
    const cleanupTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

    // Load images from assets directory
    useEffect(() => {
        const loadImages = async () => {
            try {
                const imageContext = import.meta.glob('../assets/images/*', { eager: true });
                const urls: string[] = Object.entries(imageContext)
                    .map(([_, module]) => (module as { default: string }).default)
                    .sort();

                console.log('Loaded images:', urls.length);
                setImageUrls(urls);
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };

        if (isActive) {
            loadImages();
        }
    }, [isActive]);

    // Preload images and cache them
    const preloadImage = useCallback((src: string) => {
        if (!imageCache.current[src]) {
            const img = document.createElement('img');
            img.src = src;
            imageCache.current[src] = img;
        }
        return src;
    }, []);

    const createImagePosition = useCallback((src: string, index: number): ImagePosition => {
        // Create three size tiers for more dramatic variety
        const sizeTier = Math.random();
        let scale;
        if (sizeTier < 0.4) { // 40% chance of small
            scale = 0.3 + Math.random() * 0.2; // 0.3 - 0.5
        } else if (sizeTier < 0.85) { // 45% chance of medium
            scale = 0.5 + Math.random() * 0.3; // 0.5 - 0.8
        } else { // 15% chance of large
            scale = 1.0 + Math.random() * 0.4; // 1.0 - 1.4
        }

        // Adjust base size based on screen width
        const baseSize = window.innerWidth <= 768
            ? (window.innerWidth <= 480 ? 200 : 250)
            : 400;

        const position = getRandomPosition(baseSize * scale);

        return {
            src,
            x: position.x,
            y: position.y,
            rotation: (Math.random() - 0.5) * 30,
            scale,
            zIndex: index % 10,
            key: `${src}-${index}`,
            index
        };
    }, []);

    // Cleanup old images
    const cleanupOldImages = useCallback(() => {
        setImages(prevImages => {
            if (prevImages.length > MAX_ACTIVE_IMAGES) {
                return prevImages.slice(IMAGES_PER_CLEANUP);
            }
            return prevImages;
        });
    }, []);

    // Add one image at a time
    useEffect(() => {
        if (isActive && imageUrls.length > 0) {
            // Preload all images initially
            imageUrls.forEach(preloadImage);

            const addNextImage = () => {
                const nextIndex = currentIndex % imageUrls.length;
                const nextImage = imageUrls[nextIndex];

                const newImage = createImagePosition(nextImage, nextIndex);
                setImages(prevImages => {
                    const updatedImages = [...prevImages, newImage];
                    return updatedImages.length > MAX_ACTIVE_IMAGES
                        ? updatedImages.slice(1)
                        : updatedImages;
                });

                setCurrentIndex(nextIndex + 1);

                // Schedule cleanup if we're approaching the max
                if (images.length >= MAX_ACTIVE_IMAGES - IMAGES_PER_CLEANUP) {
                    if (cleanupTimeout.current) {
                        clearTimeout(cleanupTimeout.current);
                    }
                    cleanupTimeout.current = setTimeout(cleanupOldImages, 1000);
                }
            };

            // Add first image immediately if no images
            if (images.length === 0) {
                addNextImage();
            }

            const interval = setInterval(addNextImage, 250);

            return () => {
                clearInterval(interval);
                if (cleanupTimeout.current) {
                    clearTimeout(cleanupTimeout.current);
                }
            };
        }
    }, [isActive, imageUrls, createImagePosition, preloadImage, currentIndex, cleanupOldImages]);

    return (
        <AnimatePresence>
            {isActive && (
                <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {images.map((img) => (
                        <Image
                            key={img.key}
                            src={img.src}
                            $zIndex={img.zIndex}
                            initial={{
                                x: img.x,
                                y: img.y,
                                rotate: img.rotation,
                                scale: img.scale,
                                opacity: 1
                            }}
                            animate={{
                                opacity: 1
                            }}
                            style={{
                                left: 0,
                                top: 0,
                                transform: `translate3d(${img.x}px, ${img.y}px, 0) rotate(${img.rotation}deg) scale(${img.scale})`
                            }}
                        />
                    ))}
                </Overlay>
            )}
        </AnimatePresence>
    );
}; 