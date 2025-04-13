import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TitleContainer = styled(motion.div)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    pointer-events: none;
`;

const Title = styled.h1`
    font-family: 'TAYMilkbar', sans-serif;
    font-size: 4rem;
    color: #8ba6a9;
    text-align: center;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

interface AnimatedTitleProps {
    onAnimationComplete?: () => void;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ onAnimationComplete }) => {
    return (
        <TitleContainer
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2, delay: 1 }}
            onAnimationComplete={onAnimationComplete}
        >
            <Title>ENDLESS COLLAGE</Title>
        </TitleContainer>
    );
};

export default AnimatedTitle; 