import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Preloader from '../components/Preloader';
import AnimatedTitle from '../components/AnimatedTitle';
import './doorway2.css';

const Container = styled.div`
  position: relative;
  min-height: 200vh;
  background: #1a1a1a;
  overflow: hidden;
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
`;

const StyledImage = styled.img`
  max-height: 330vh;
  transform: scale(1.08);
  transition: transform 0.3s ease;
  transform-origin: center center;
`;

const SwordContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 85vh;
`;

const SwordSection = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

interface SwordImageProps {
  loaded?: boolean;
}

const SwordImage = styled.img<SwordImageProps>`
  width: auto;
  height: auto;
  max-height: 330vh;
  object-fit: contain;
  opacity: 1;
  filter: drop-shadow(0 0 70px rgba(255, 0, 0, 0.5)) brightness(1.4);
  visibility: ${props => props.loaded ? 'visible' : 'hidden'};
  transform: scale(1.08);
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

function Doorway2() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const location = useLocation();
  const fromLanding = location.state?.fromLanding;
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollCount = useRef(0);
  const maxScrollCount = 300;
  const isProcessing = useRef(false);
  const attempts = useRef(0);

  // Add/remove doorway2-page class
  useEffect(() => {
    document.body.classList.add('doorway2-page');
    return () => {
      document.body.classList.remove('doorway2-page');
    };
  }, []);

  // Preload the sword image
  useEffect(() => {
    const img = new Image();
    img.src = 'longsword.png';
    img.onload = () => setImageLoaded(true);
  }, []);

  useEffect(() => {
    if (fromLanding) {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [fromLanding]);

  useEffect(() => {
    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      if (!imageRef.current || isProcessing.current || scrollCount.current >= maxScrollCount) return;

      const currentScrollTop = window.scrollY;
      const isScrollingDown = currentScrollTop > lastScrollTop;

      // When scrolling down past threshold
      if (isScrollingDown && currentScrollTop >= 1351 && !isProcessing.current) {
        isProcessing.current = true;
        scrollCount.current++;

        window.scrollTo({
          top: 1000,
          behavior: 'auto'
        });

        setTimeout(() => {
          isProcessing.current = false;
        }, 1000);
      }

      // When scrolling up past threshold
      if (!isScrollingDown && currentScrollTop <= 1271 && !isProcessing.current) {
        isProcessing.current = true;
        scrollCount.current++;

        window.scrollTo({
          top: 2000,
          behavior: 'auto'
        });

        setTimeout(() => {
          isProcessing.current = false;
        }, 1000);
      }

      // Reset scroll count at extremes
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight || window.scrollY === 0) {
        scrollCount.current = 0;
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (fromLanding && isLoading) {
    return <Preloader isLoading={true} />;
  }

  return (
    <Container>
      <div className="medieval-background"></div>
      <div className="torch-overlay"></div>
      <div className="texture-overlay"></div>

      <AnimatedTitle
        text="LONG SWORD"
        color="#ff0000"
        font="'Metal Mania', 'Cinzel', serif"
        size="11vw"
      />
      <HypnoticReturn to="/" title="Return to landing page">
        <svg viewBox="0 0 100 100">
          <path d="M 50 50 m 0 -35 a 35 35 0 0 1 0 70 a 28 28 0 0 1 0 -56 a 21 21 0 0 1 0 42 a 14 14 0 0 1 0 -28 a 7 7 0 0 1 0 14" />
        </svg>
      </HypnoticReturn>

      <SwordContainer>
        <SwordSection>
          <SwordImage
            ref={imageRef}
            src="longsword.png"
            alt="Longsword"
            loaded={imageLoaded}
          />
        </SwordSection>
      </SwordContainer>
    </Container>
  );
}

export default Doorway2; 