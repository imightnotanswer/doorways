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
`;

const Title = styled(motion.h1)`
  color: #ffdd00;
  text-transform: uppercase;
  font-family: 'VT323', monospace;
  font-size: 12vw;
  text-align: center;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: bold;
`;

interface AnimatedTitleProps {
    text: string;
}

const AnimatedTitle = ({ text }: AnimatedTitleProps) => {
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