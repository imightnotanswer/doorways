import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

const TitleContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 100;
    padding: 2rem;
`;

const Title = styled(motion.h1) <{ color?: string; font?: string; size?: string }>`
    color: ${props => props.color || '#ffdd00'};
    text-transform: uppercase;
    font-family: ${props => props.font || "'VT323', monospace"};
    font-size: ${props => props.size || '12vw'};
    text-align: center;
    margin: 0;
    line-height: 1.1;
    letter-spacing: 0.02em;
    font-weight: 900;
    max-width: 90%;
    word-wrap: break-word;
    white-space: pre-wrap;
    text-shadow: 
        ${props => props.font?.includes('Metal Mania') ? `
        0 0 10px ${props.color || '#ffdd00'}66,
        0 0 20px ${props.color || '#ffdd00'}33,
        0 0 30px ${props.color || '#ffdd00'}22,
        2px 2px 2px rgba(0, 0, 0, 0.8)
        ` : `
        2px 2px 0px rgba(0, 0, 0, 0.2),
        -2px -2px 0px rgba(255, 255, 255, 0.1),
        0 0 20px ${props.color || '#ffdd00'}33
        `};
    mix-blend-mode: ${props => props.font?.includes('Metal Mania') ? 'hard-light' : 'screen'};
    
    @media (max-width: 768px) {
        font-size: ${props => {
        if (props.size?.includes('vw')) {
            const sizeNum = parseFloat(props.size);
            return `${sizeNum * 1.2}vw`;
        }
        return props.size || '14vw';
    }};
        max-width: 95%;
    }
`;

interface AnimatedTitleProps {
    text: string;
    color?: string;
    font?: string;
    size?: string;
}

const AnimatedTitle = ({ text, color, font, size }: AnimatedTitleProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <TitleContainer
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Title
                        color={color}
                        font={font}
                        size={size}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {text}
                    </Title>
                </TitleContainer>
            )}
        </AnimatePresence>
    );
};

export default AnimatedTitle; 