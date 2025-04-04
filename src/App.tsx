import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Doorway1 from './pages/doorway1';
import Doorway1Part2 from './pages/doorway1_part2';
import { keyframes } from '@emotion/react';

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
  z-index: 1;
  opacity: 0.02;
  pointer-events: none;
  mix-blend-mode: multiply;
  
  &::after {
    content: "";
    position: absolute;
    top: -150%;
    left: -50%;
    right: -50%;
    bottom: -150%;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92U2hXHF/C1M8uP/ZtYdiuj26UdAdQQSXQErwSOMzt/XWRWAz5GuSBIkwG1H3FabJ2OsUOUhGC6tK4EMtJO0ttC6IBD3kM0ve0tJwMdSfjZo+EEISaeTr9P3wYrGjXqyC1krcKdhMpxEnt5JetoulscpyzhXN5FRpuPHvbeQaKxFAEB6EN+cYN6xD7RYGpXpNndMmZgM5Dcs3YSNFDHUo2LGfZuukSWyUYirJAdYbF3MfqEKmjM+I2EfhA94iG3L7uKrR+GdWD73ydlIB+6hgref1QTlmgmbM3/LeX5GI1Ux1RWpgxpLuZ2+I+IjzZ8wqE4nilvQdkUdfhzI5QDWy+kw5Wgg2pGpeEVeCCA7b85BO3F9DzxB3cdqvBzWcmzbyMiqhzuYqtHRVG2y4x+KOlnyqla8AoWWpuBoYRxzXrfKuILl6SfiWCbjxoZJUaCBj1CjH7GIaDbc9kqBY3W/Rgjda1iqQcOJu2WW+76pZC9QG7M00dffe9hNnseupFL53r8F7YHSwJWUKP2q+k7RdsxyOB11n0xtOvnW4irMMFNV4H0uqwS5ExsmP9AxbDTc9JwgneAT5vTiUSm1E7BSflSt3bfa1tv8Di3R8n3Af7MNWzs49hmauE2wP+ttrq+AsWpFG2awvsuOqbipWHgtuvuaAE+A1Z/7gC9hesnr+7wqCwG8c5yAg3AL1fm8T9AZtp/bbJGwl1pNrE7RuOX7PeMRUERVaPpEs+yqeoSmuOlokqw49pgomjLeh7icHNlG19yjs6XXOMedYm5xH2YxpV2tc0Ro2jJfxC50ApuxGob7lMsxfTbeUv07TyYxpeLucEH1gNd4IKH2LAg5TdVhlCafZvpskfncCfx8pOhJzd76bJWeYFnFciwcYfubRc12Ip/ppIhA1/mSZ/RxjFDrJC5xifFjJpY2Xl5zXdguFqYyTR1zSp1Y9p+tktDYYSNflcxI0iyO4TPBdlRcpeqjK/piF5bklq77VSEaA+z8qmJTFzIWiitbnzR794USKBUaT0NTEsVjZqLaFVqJoPN9ODG70IPbfBHKK+/q/AWR0tJzYHRULOa4MP+W/HfGadZUbfw177G7j/OGbIs8TahLyynl4X4RinF793Oz+BU0saXtUHrVBFT/DnA3ctNPoGbs4hRIjTok8i+algT1lTHi4SxFvONKNrgQFAq2/gFnWMXgwffgYMJpiKYkmW3tTg3ZQ9Jq+f8XN+A5eeUKHWvJWJ2sgJ1Sop+wwhqFVijqWaJhwtD8MNlSBeWNNWTa5Z5kPZw5+LbVT99wqTdx29lMUH4OIG/D86ruKEauBjvH5xy6um/Sfj7ei6UUVk4AIl3MyD4MSSTOFgSwsH/QJWaQ5as7ZcmgBZkzjjU1UrQ74ci1gWBCSGHtuV1H2mhSnO3Wp/3fEV5a+4wz//6qy8JxjZsmxxy5+4w9CDNJY09T072iKG0EnOS0arEYgXqYnXcYHwjTtUNAcMelOd4xpkoqiTYICWFq0JSiPfPDQdnt+4/wuqcXY47QILbgAAAABJRU5ErkJggg==");
    animation: ${noiseAnimation} 0.2s infinite;
    will-change: transform;
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
  z-index: 2;
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
