import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.25rem;
`;

const MainTitle = styled.h1`
  color: #ff0000;
  text-transform: uppercase;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: min(4vw, 3.5rem);
  text-align: center;
  margin: 0;
  line-height: 1.1;
  padding: 0 1rem;
  letter-spacing: -0.02em;
  background: linear-gradient(45deg, #ff0000, #ff3333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 2px 0px rgba(255, 0, 0, 0.3));
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  span {
    display: block;
  }

  span:last-child {
    font-size: 0.9em;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #ff6666, #ff0000);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translate(2px, 2px);
    z-index: -1;
    opacity: 0.5;
  }
`;

const DoorwayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  padding: 0;
  margin-top: 2rem;
`;

const DoorwayLink = styled(Link)`
  position: relative;
  aspect-ratio: 1;
  display: block;
  transition: transform 0.3s ease;
  max-width: 190px;
  margin: 0 auto;

  &:hover {
    transform: scale(1.02);
  }
`;

const DoorwayImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
    <AppContainer>
      <MainTitle>
        <span>Imightnotanswer</span>
        <span>Doorways</span>
      </MainTitle>
      <DoorwayGrid>
        {doorways.map((doorway) => (
          <DoorwayLink key={doorway.id} to={doorway.path}>
            <DoorwayImage
              src="/doorway-base.png"
              alt={`Doorway ${doorway.id}`}
            />
          </DoorwayLink>
        ))}
      </DoorwayGrid>
    </AppContainer>
  );
}

export default App;
