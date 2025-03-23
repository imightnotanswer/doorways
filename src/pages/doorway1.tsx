import styled from '@emotion/styled';
import AnimatedTitle from '../components/AnimatedTitle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import './doorway1.css';

const DoorwayContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #e8e6e1; // Wall color
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 35%; // Slightly reduced floor height
    background: #2c4c43; // Floor color - a muted green
    z-index: 0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(232, 230, 225, 0.2),
      rgba(44, 76, 67, 0.2)
    );
    z-index: 1;
    pointer-events: none;
  }
`;

const RoomContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 70vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 2;
  padding: 0 min(4rem, 5vw); // Responsive padding
  margin-bottom: 35vh;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const TVContainer = styled.div`
  position: relative;
  width: min(300px, 25vw);
  aspect-ratio: 16/9;
  background: #2b2b2b;
  border-radius: min(25px, 3vw);
  padding: min(8px, 1vw);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    inset 0 2px 10px rgba(255, 255, 255, 0.1);
  z-index: 1;
  transform: perspective(1000px) rotateX(2deg) translateX(min(-2rem, -3vw)) translateY(min(-8rem, -12vh));
  margin-left: min(1rem, 2vw);

  @media (max-width: 768px) {
    width: min(220px, 35vw);
    margin-left: min(2rem, 4vw);
    transform: perspective(1000px) rotateX(2deg) translateX(-0.5rem) translateY(-6rem);
  }
`;

const RoomDoorway = styled.div`
  position: relative;
  width: min(150px, 18vw);
  height: min(280px, 35vh);
  background: transparent;
  position: relative;
  overflow: visible;
  cursor: pointer;
  
  &:hover {    
    &:before {
      background: #2a2a2a;
    }
  }
  
  @media (max-width: 768px) {
    width: min(150px, 25vw);
    height: min(240px, 40vh);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1a1a1a;
    border-radius: min(90px, 10vw) min(90px, 10vw) 0 0;
    transform-origin: bottom;
    transform: perspective(1000px) rotateY(-5deg);
    box-shadow: 
      inset 0 0 40px rgba(0, 0, 0, 0.6),
      0 0 30px rgba(0, 0, 0, 0.3);
    transition: background 0.3s ease-in-out;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(26, 26, 26, 0) 0%,
      rgba(26, 26, 26, 0.9) 100%
    );
    border-radius: min(90px, 10vw) min(90px, 10vw) 0 0;
    transform-origin: bottom;
    transform: perspective(1000px) rotateY(-5deg);
    z-index: 2;
  }
`;

const DoorFrame = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: 0;
  border: min(10px, 1.5vw) solid #2b2b2b;
  border-radius: min(98px, 11vw) min(98px, 11vw) 0 0;
  transform-origin: bottom;
  transform: perspective(1000px) rotateY(-5deg);
  z-index: 3;
  
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: min(102px, 12vw) min(102px, 12vw) 0 0;
  }
`;

const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: min(18px, 2vw);
  background: #000;
  box-shadow: 
    inset 0 2px 15px rgba(255, 255, 255, 0.05),
    0 0 20px rgba(0, 0, 0, 0.2);
`;

const Static = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.7;
  mix-blend-mode: hard-light;
  animation: tvStatic 0.033s steps(1) infinite;
`;

const StaticOverlay = styled(Static)`
  opacity: 0.1;
  mix-blend-mode: soft-light;
  pointer-events: none;
`;

const NoiseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 0, 0, 0.05) 51%
  );
  background-size: 100% 4px;
  animation: scanlines 8s linear infinite;
  pointer-events: none;
  opacity: 0.6;
`;

const NoiseOverlayLight = styled(NoiseOverlay)`
  opacity: 0.3;
`;

const NoiseLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-radial-gradient(#000 0 0.0001%, #fff 0 0.0002%) 50% 50%/100px 100px;
  animation: tvNoise 0.033s steps(1) infinite;
  opacity: 0.2;
  mix-blend-mode: overlay;
`;

const NoiseScanlines = styled(NoiseLayer)`
  opacity: 0.1;
  mix-blend-mode: overlay;
`;

const AmbientLight = styled.div`
  position: absolute;
  top: -20%;
  left: -20%;
  right: -20%;
  bottom: -20%;
  background: radial-gradient(
    circle at 30% 50%,
    rgba(188, 206, 214, 0.15),
    transparent 70%
  );
  pointer-events: none;
  z-index: 2;
  mix-blend-mode: soft-light;
`;

const NavigationArrows = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 3;
`;

interface ArrowProps {
  direction?: 'left' | 'right';
}

const Arrow = styled.div<ArrowProps>`
  width: 40px;
  height: 40px;
  background: #2b2b2b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #363636;
  }

  &:before {
    content: '';
    width: 12px;
    height: 12px;
    border: 2px solid #fff;
    border-left: 0;
    border-bottom: 0;
    transform: ${props => props.direction === 'left' ? 'rotate(-135deg)' : 'rotate(45deg)'};
  }
`;

const WallArt = styled.div`
  position: absolute;
  display: flex;
  gap: min(2rem, 3vw);
  top: 22%;
  left: 45%;
  transform: translateX(-50%);
  z-index: 3;
`;

const Painting = styled.div<{ size?: string; offset?: string; frameColor?: string }>`
  position: relative;
  width: min(50px, 7vw);
  aspect-ratio: 1;
  transform: translateY(${props => props.offset || "0"});

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% + min(6px, 0.75vw));
    height: calc(100% + min(6px, 0.75vw));
    transform: translate(-50%, -50%);
    background: ${props => props.frameColor || "#8b7355"};
    border-radius: min(2px, 0.25vw);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .canvas {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f7f7f7;
    padding: min(3px, 0.4vw);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 85%;
    height: 85%;
    object-fit: contain;
  }

  &:after {
    content: '';
    position: absolute;
    top: min(-5px, -0.6vw);
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: min(5px, 0.6vw);
    background: #2b2b2b;
  }
`;

const ColorBars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-rows: 75% 25%;

  .main-bars {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    height: 100%;

    .yellow { background: #ffff00; }
    .cyan { background: #00ffff; }
    .green { background: #00ff00; }
    .magenta { background: #ff00ff; }
    .red { background: #ff0000; }
    .blue { background: #0000ff; }
    .white { background: #ffffff; }
  }

  .bottom-bars {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    height: 100%;

    .blue-dark { background: #0000bf; }
    .white { background: #ffffff; }
    .purple { background: #4000bf; }
    .black { background: #000000; }
    .gray-dark { background: #292929; }
    .gray { background: #767676; }
    .gray-light { background: #cccccc; }
    .black-end { background: #101010; }
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

function Doorway1() {
  const [currentChannel, setCurrentChannel] = useState<'static' | 'colorbars'>('static');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const fromLanding = location.state?.fromLanding;

  // Add this - create audio object for click sound
  const clickSound = new Audio('/click-button-131479.mp3');

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

  const handleChannelChange = (direction: 'left' | 'right') => {
    // Play click sound
    clickSound.currentTime = 0; // Reset sound to beginning
    clickSound.play().catch(err => console.error("Audio play failed:", err));

    // Existing channel change logic
    if (direction === 'right' && currentChannel === 'static') {
      setCurrentChannel('colorbars');
    } else if (direction === 'left' && currentChannel === 'colorbars') {
      setCurrentChannel('static');
    }
  };

  const handleDoorwayClick = () => {
    navigate('/doorway1_part2', { state: { fromDoorway: true } });
  };

  if (fromLanding && isLoading) {
    return <Preloader isLoading={true} />;
  }

  return (
    <DoorwayContainer>
      <AnimatedTitle text="LIVING ROOM" />
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
      <NavigationArrows>
        <Arrow
          as="button"
          aria-label="Previous channel"
          direction="left"
          onClick={() => handleChannelChange('left')}
        />
        <Arrow
          as="button"
          aria-label="Next channel"
          direction="right"
          onClick={() => handleChannelChange('right')}
        />
      </NavigationArrows>
      <WallArt>
        <Painting offset="min(-0.5rem, -0.75vh)" frameColor="#a08b6c">
          <div className="canvas">
            <img src="orange.png" alt="Orange painting" />
          </div>
        </Painting>
        <Painting
          offset="min(0.25rem, 0.5vh)"
          frameColor="#2b2b2b"
        >
          <div className="canvas">
            <img src="vase.png" alt="Vase painting" />
          </div>
        </Painting>
      </WallArt>
      <RoomContent>
        <TVContainer>
          <Screen>
            {currentChannel === 'static' ? (
              <>
                <Static />
                <NoiseLayer />
                <NoiseOverlay />
              </>
            ) : (
              <>
                <ColorBars>
                  <div className="main-bars">
                    <div className="yellow" />
                    <div className="cyan" />
                    <div className="green" />
                    <div className="magenta" />
                    <div className="red" />
                    <div className="blue" />
                    <div className="white" />
                  </div>
                  <div className="bottom-bars">
                    <div className="blue-dark" />
                    <div className="white" />
                    <div className="purple" />
                    <div className="black" />
                    <div className="gray-dark" />
                    <div className="gray" />
                    <div className="gray-light" />
                    <div className="black-end" />
                  </div>
                </ColorBars>
                <StaticOverlay />
                <NoiseScanlines />
                <NoiseOverlayLight />
              </>
            )}
          </Screen>
        </TVContainer>
        <RoomDoorway onClick={handleDoorwayClick}>
          <DoorFrame />
        </RoomDoorway>
      </RoomContent>
      <AmbientLight />
    </DoorwayContainer>
  );
}

export default Doorway1; 