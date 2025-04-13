import './env-test';
// import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import ContactMenu from './components/ContactMenu';

const noiseAnimation = keyframes`
  0% { transform: translate(0,0) }
  10% { transform: translate(-5%,-5%) }
  20% { transform: translate(-10%,5%) }
  30% { transform: translate(5%,-10%) }
  40% { transform: translate(-5%,15%) }
  50% { transform: translate(-10%,5%) }
  60% { transform: translate(15%,0) }
  70% { transform: translate(0,10%) }
  80% { transform: translate(-15%,0) }
  90% { transform: translate(10%,5%) }
  100% { transform: translate(5%,0) }
`;

const NoiseOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.15;
  mix-blend-mode: overlay;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    animation: ${noiseAnimation} 0.2s steps(1) infinite;
    mix-blend-mode: overlay;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f5e6e0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.25rem;
  position: relative;
  z-index: 1;
`;

const MainTitle = styled.h1`
  color: #e8927c;
  text-transform: uppercase;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: min(4vw, 3.5rem);
  text-align: center;
  margin: 0;
  line-height: 1.1;
  padding: 0 1rem;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-shadow: 2px 2px 0px rgba(232, 146, 124, 0.3);
  
  span {
    display: block;
  }

  span:last-child {
    font-size: 0.9em;
  }
`;

const DoorwayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0rem;
  row-gap: 1rem;
  justify-content: center;
  max-width: 650px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
  margin-top: 2rem;
`;

const DoorwayLink = styled(Link)`
  position: relative;
  aspect-ratio: 1;
  display: block;
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 180px;
  margin: 0 auto 2rem auto;
  margin-left: -10px;
  margin-right: -10px;
  
  &:hover {
    transform: scale(1.05);
    z-index: 2;
  }
`;

const DoorwayImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  padding: 0 5px;
`;

const doorways = [
  { id: 1, path: '/doorway1' },
  { id: 2, path: '/doorway2' },
  { id: 3, path: '/doorway3' },
  { id: 4, path: '/doorway4' },
  { id: 5, path: '/doorway5' },
  { id: 6, path: '/doorway6' },
];

function App() {
  return (
    <>
      <NoiseOverlay />
      <ContactMenu />
      <AppContainer>
        <MainTitle>
          <span>Imightnotanswer</span>
          <span>Doorways</span>
        </MainTitle>
        <DoorwayGrid>
          {doorways.map((doorway) => (
            <DoorwayLink
              key={doorway.id}
              to={doorway.path}
              state={{ fromLanding: true }}
            >
              <DoorwayImage
                src="doorway-base.png"
                alt={`Doorway ${doorway.id}`}
              />
            </DoorwayLink>
          ))}
        </DoorwayGrid>
      </AppContainer>
    </>
  );
}

export default App;
