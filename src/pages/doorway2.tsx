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
`;

const SwordContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 500vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
`;

const SwordSection = styled.div<{ index: number }>`
  position: sticky;
  top: ${props => 40 + (props.index * -15)}vh;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${props => 4 - props.index};
  transform: translateY(${props => props.index * 5}vh);
`;

const SwordImage = styled.img`
  max-height: 95vh;
  width: auto;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.05));

  &.visible {
    opacity: 1;
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

function Doorway2() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const fromLanding = location.state?.fromLanding;
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([false, false, false, false]);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.sword-section');
      const newVisibleSections = [...visibleSections];
      const currentScrollY = window.scrollY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        newVisibleSections[index] = isVisible;

        // Enhanced reverse scroll effect
        if (isVisible && index > 0) {
          const scrollDelta = currentScrollY - lastScrollY.current;
          if (scrollDelta > 0) { // Only on downward scroll
            const scrollAmount = Math.min(scrollDelta * 0.15, 30);
            window.scrollBy(0, -scrollAmount);
          }
        }
      });

      lastScrollY.current = currentScrollY;
      setVisibleSections(newVisibleSections);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  if (fromLanding && isLoading) {
    return <Preloader isLoading={true} />;
  }

  return (
    <Container ref={containerRef}>
      <AnimatedTitle text="LONG SWORD" />
      <HypnoticReturn to="/" title="Return to landing page">
        <svg viewBox="0 0 100 100">
          <path d="M 50 50 m 0 -35 a 35 35 0 0 1 0 70 a 28 28 0 0 1 0 -56 a 21 21 0 0 1 0 42 a 14 14 0 0 1 0 -28 a 7 7 0 0 1 0 14" />
        </svg>
      </HypnoticReturn>
      <SwordContainer>
        {['/longsword.png', '/longsword1.png', '/longsword2.png', '/longsword3.png'].map((src, index) => (
          <SwordSection key={index} index={index} className="sword-section">
            <SwordImage
              src={src}
              alt={`Longsword section ${index + 1}`}
              className={visibleSections[index] ? 'visible' : ''}
            />
          </SwordSection>
        ))}
      </SwordContainer>
    </Container>
  );
}

export default Doorway2; 