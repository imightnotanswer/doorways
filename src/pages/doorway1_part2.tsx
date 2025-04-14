import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Preloader from '../components/Preloader';
import AnimatedTitle from '../components/AnimatedTitle';
import '../styles/doorway1_part2.css';

// Load the TAYMakawao font
const fontStyle = document.createElement('style');
fontStyle.textContent = `
    @font-face {
        font-family: 'TAYMakawao';
        src: url('/src/assets/fonts/TAYMakawao.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
    }
`;
document.head.appendChild(fontStyle);

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeInAndOut = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Container = styled.div`
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
`;

const EyesContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: clamp(30px, 5vw, 60px);
  z-index: 1;
  opacity: 0;
  animation: ${fadeInAndOut} 7.5s ease-in-out forwards;
  animation-delay: 3s;

  @media (max-width: 768px) {
    top: 40%;
    gap: 30px;
  }
`;

const Eye = styled.div`
  width: clamp(25px, 4vw, 45px);
  height: clamp(16px, 2.5vw, 28px);
  background: #ffffff;
  border-radius: 100%/70%;
  position: relative;
  transform: translateY(-50%);
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Iris = styled.div`
  width: clamp(14px, 2vw, 24px);
  height: clamp(14px, 2vw, 24px);
  background: #000000;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);

  &::after {
    content: '';
    position: absolute;
    width: clamp(4px, 0.8vw, 8px);
    height: clamp(4px, 0.8vw, 8px);
    background: #ffffff;
    border-radius: 50%;
    top: 20%;
    left: 20%;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
  }
`;

const HypnoticReturn = styled(Link)`
  position: fixed;
  top: 2rem;
  left: 2rem;
  width: 70px;
  height: 70px;
  cursor: pointer;
  z-index: 10;
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
    stroke: #e8927c;
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
    stroke: #ffa69e;
  }

  @keyframes homeshakeHypno {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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

const MessageText = styled.div`
  position: fixed;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: 'Archivo Black', 'Impact', sans-serif;
  font-size: 4vw;
  opacity: 0;
  animation: ${fadeInOut} 5s ease-in-out forwards;
  animation-delay: 5s;
  white-space: nowrap;
  z-index: 2;
`;

function Doorway1Part2() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const fromDoorway = location.state?.fromDoorway;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const eyes = document.querySelectorAll<HTMLElement>('.iris');
    eyes.forEach(iris => {
      const eye = iris.parentElement;
      if (!eye) return;

      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const radius = 6;

      const targetX = Math.cos(angle) * radius;
      const targetY = Math.sin(angle) * radius;

      // Get current position or default to center
      const transform = window.getComputedStyle(iris).transform;
      const matrix = new DOMMatrix(transform);
      const currentX = matrix.m41 || 0;
      const currentY = matrix.m42 || 0;

      // Smoother interpolation
      const newX = currentX + (targetX - currentX) * 0.2;
      const newY = currentY + (targetY - currentY) * 0.2;

      iris.style.transform = `translate(calc(-50% + ${newX}px), calc(-50% + ${newY}px))`;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (!fromDoorway) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [fromDoorway]);

  if (!fromDoorway && isLoading) {
    return <Preloader isLoading={true} />;
  }

  return (
    <Container>
      <HypnoticReturn to="/" title="Return to landing page">
        <svg viewBox="0 0 100 100">
          <path d="
              M 50 50
              m 0 -35
              a 35 35 0 0 1 0 70
              a 28 28 0 0 1 0 -56
              a 21 21 0 0 1 0 42
              a 14 14 0 0 1 0 -28
              a 7 7 0 0 1 0 14
            " />
        </svg>
      </HypnoticReturn>
      <AnimatedTitle
        text="YOU HAVE ARRIVED"
        font="'TAYMakawao', sans-serif"
        color="#8ba6a9"
        size="12vw"
      />
      <EyesContainer>
        <Eye className="eye">
          <Iris className="iris" />
        </Eye>
        <Eye className="eye">
          <Iris className="iris" />
        </Eye>
      </EyesContainer>
      <MessageText>Where have you been?</MessageText>
    </Container>
  );
}

export default Doorway1Part2;