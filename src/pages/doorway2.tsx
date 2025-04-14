import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import AnimatedTitle from '../components/AnimatedTitle';

const Container = styled.div`
    position: relative;
    min-height: 200vh;
    background: #1a1a1a;
    overflow-x: hidden;
`;

const HypnoticReturn = styled(Link)`
    position: fixed;
    top: 2rem;
    left: 2rem;
    width: 70px;
    height: 70px;
    cursor: pointer;
    z-index: 1002;
    opacity: 1;
    padding: 10px;
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

export const Doorway2: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Preloader isLoading={isLoading} />;
    }

    return (
        <Container>
            <AnimatedTitle
                text="LONGSWORD"
                color="#9054c5"
                font="'Metal Mania', cursive"
                size="12vw"
            />
            <HypnoticReturn to="/" title="Return to landing page">
                <svg viewBox="0 0 100 100">
                    <path d="M 50 50 m 0 -35 a 35 35 0 0 1 0 70 a 28 28 0 0 1 0 -56 a 21 21 0 0 1 0 42 a 14 14 0 0 1 0 -28 a 7 7 0 0 1 0 14" />
                </svg>
            </HypnoticReturn>
        </Container>
    );
};

export default Doorway2; 