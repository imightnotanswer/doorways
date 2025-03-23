import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

const PreloaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #001a66;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
`;

const ScrollingTextContainer = styled.div`
  position: absolute;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  
  &.top {
    top: 0.25rem;
  }
  
  &.bottom {
    bottom: 0.25rem;
  }
`;

const ScrollingText = styled.div`
  display: inline-block;
  color: #000;
  font-family: 'Syne', sans-serif;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  padding: 0.5rem 0;
  animation: scroll 20s linear infinite;
  animation-fill-mode: both;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const CloudContainer = styled.div`
  position: relative;
  width: 220px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cloud = styled.div`
  background: #000;
  width: 220px;
  height: 280px;
  position: relative;
  border-radius: 0;
`;

const LoadingText = styled.div`
  color: #001a66;
  font-family: 'Syne', sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  white-space: normal;
  text-align: center;
  line-height: 1.2;
  width: 190px;
  letter-spacing: 0.02em;
  
  span {
    display: block;
    text-transform: uppercase;
    margin: 2px 0;
  }
`;

interface PreloaderProps {
    isLoading: boolean;
}

const Preloader = ({ isLoading }: PreloaderProps) => {
    const baseText = "IMIGHTNOTANSWER DOORWAYS ";
    const repeatedText = baseText.repeat(10);
    const doubleText = repeatedText + repeatedText;

    return (
        <AnimatePresence>
            {isLoading && (
                <PreloaderContainer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ScrollingTextContainer className="top">
                        <ScrollingText>{doubleText}</ScrollingText>
                    </ScrollingTextContainer>

                    <CloudContainer>
                        <Cloud />
                        <LoadingText>
                            <span>imightnotanswer</span>
                            <span>doorways</span>
                        </LoadingText>
                    </CloudContainer>

                    <ScrollingTextContainer className="bottom">
                        <ScrollingText>{doubleText}</ScrollingText>
                    </ScrollingTextContainer>
                </PreloaderContainer>
            )}
        </AnimatePresence>
    );
};

export default Preloader; 