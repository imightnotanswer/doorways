import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { CollageOverlay } from '../components/CollageOverlay';
import { motion } from 'framer-motion';
import '../styles/doorway3.css';

const Container = styled.div`
    position: relative;
    min-height: 100vh;
    max-height: 100vh;
    background: #f5e6e0;
    overflow: hidden;
    
    &::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            circle at center,
            rgba(232, 146, 124, 0.03) 0%,
            rgba(245, 230, 224, 0.1) 100%
        );
        pointer-events: none;
        mix-blend-mode: overlay;
    }
`;

const ImageContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: #f5e6e0;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            45deg,
            rgba(123, 169, 164, 0.03) 0%,
            rgba(232, 146, 124, 0.03) 100%
        );
        mix-blend-mode: soft-light;
    }
`;

const StyledImage = styled.img`
    max-height: 330vh;
    transform: scale(1.08);
    transition: transform 0.3s ease;
    transform-origin: center center;
    opacity: ${props => props.src ? 1 : 0};
`;

const TitleContainer = styled(motion.div)`
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    text-align: center;
    width: 100%;
    padding: 20px;
    pointer-events: none;
`;

const Title = styled.h1`
    font-family: 'TAYMilkbar', sans-serif;
    font-size: 8vw;
    color: white;
    margin: 0;
    line-height: 0.9;
    text-transform: uppercase;
    white-space: pre-line;
    letter-spacing: 0.1em;
    mix-blend-mode: difference;
    font-weight: bold;
    
    @media (max-width: 768px) {
        font-size: 12vw;
        letter-spacing: 0.08em;
    }
`;

const HypnoticReturn = styled(Link)`
    position: fixed;
    top: 1.5rem;
    left: 1.5rem;
    width: 60px;
    height: 60px;
    cursor: pointer;
    z-index: 1002;
    opacity: 1;
    padding: 8px;
    transition: transform 0.3s ease;

    svg {
        width: 100%;
        height: 100%;
        transform-origin: center;
        animation: gentlePulse 4s ease-in-out infinite;
    }

    path {
        fill: none;
        stroke: #ff6b6b;
        stroke-width: 6;
        stroke-linecap: round;
    }

    &:hover {
        transform: scale(1.05);
    }

    &:hover svg {
        animation: homeshakeHypno 3s linear infinite;
    }

    &:hover path {
        stroke: #ff8585;
    }

    @keyframes homeshakeHypno {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes gentlePulse {
        0%, 100% { 
            transform: scale(1);
            filter: brightness(1);
        }
        50% { 
            transform: scale(0.97);
            filter: brightness(0.95);
        }
    }
`;

export const Doorway3: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showCollage, setShowCollage] = useState(false);
    const [showTitle, setShowTitle] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setShowCollage(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Preloader isLoading={isLoading} />;
    }

    return (
        <Container>
            {showTitle && (
                <TitleContainer
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 2, delay: 1 }}
                    onAnimationComplete={() => setShowTitle(false)}
                >
                    <Title>
                        {'ENDLESS\nCOLLAGE'}
                    </Title>
                </TitleContainer>
            )}
            <CollageOverlay isActive={showCollage} />
            <HypnoticReturn to="/" title="Return to landing page">
                <svg viewBox="0 0 100 100">
                    <path d="M 50 50 m 0 -35 a 35 35 0 0 1 0 70 a 28 28 0 0 1 0 -56 a 21 21 0 0 1 0 42 a 14 14 0 0 1 0 -28 a 7 7 0 0 1 0 14" />
                </svg>
            </HypnoticReturn>
            <ImageContainer>
                <StyledImage
                    src="/images/doorway3.jpg"
                    alt="Doorway 3"
                    onError={(e) => {
                        console.error('Image failed to load:', e);
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </ImageContainer>
        </Container>
    );
};

export default Doorway3;
