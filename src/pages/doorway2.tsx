import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Preloader from '../components/Preloader';
import AnimatedTitle from '../components/AnimatedTitle';
import './doorway2.css';

const Container = styled.div`
  min-height: 100vh;
  background: #000;
  color: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SwordContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 200vh; /* Initial height to allow scrolling */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 55vh;
`;

const SwordSection = styled.div<{ index: number }>`
  position: relative;
  width: 100%;
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: ${props => 4 - props.index};
  padding: 0;
  overflow: visible;
`;

const SwordImage = styled.img`
  height: 200vh;
  width: auto;
  object-fit: contain;
  opacity: 1;
  filter: drop-shadow(0 0 70px rgba(255, 0, 0, 0.5)) brightness(1.4);
  transform: scale(8);
  transform-origin: top center;
  margin-top: -40vh;
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

function Doorway2() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const fromLanding = location.state?.fromLanding;
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const containerHeightRef = useRef(2000); // Initial height in pixels

  // Simple array to track sword images
  const swordImages = [
    'longsword.png'
  ];

  useEffect(() => {
    if (fromLanding) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [fromLanding]);

  // Update container height based on scroll to allow seeing the full sword
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // If user is nearing the bottom of the currently visible area
      if (currentScrollY > (documentHeight - viewportHeight * 1.5)) {
        // Increase the container height to ensure full scroll capability
        containerHeightRef.current += viewportHeight * 3;

        if (containerRef.current) {
          containerRef.current.style.minHeight = `${containerHeightRef.current}px`;
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (fromLanding && isLoading) {
    return <Preloader isLoading={true} />;
  }

  return (
    <Container>
      {/* Medieval background elements - these need to be first */}
      <div className="medieval-background"></div>
      <div className="torch-overlay"></div>
      <div className="texture-overlay"></div>

      <AnimatedTitle text="LONG SWORD" color="#ff0000" />
      <HypnoticReturn to="/" title="Return to landing page">
        <svg viewBox="0 0 100 100">
          <path d="M 50 50 m 0 -35 a 35 35 0 0 1 0 70 a 28 28 0 0 1 0 -56 a 21 21 0 0 1 0 42 a 14 14 0 0 1 0 -28 a 7 7 0 0 1 0 14" />
        </svg>
      </HypnoticReturn>

      <SwordContainer ref={containerRef}>
        {swordImages.map((src, index) => (
          <SwordSection key={index} index={index} className="sword-section">
            <SwordImage
              src={src}
              alt={`Longsword section ${index + 1}`}
            />
          </SwordSection>
        ))}
      </SwordContainer>
    </Container>
  );
}

export default Doorway2; 