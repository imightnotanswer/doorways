import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
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

const Content = styled.div`
  font-size: 2rem;
  text-align: center;
`;

function Doorway1Part2() {
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
            <Content>
                Welcome to the other side...
            </Content>
        </Container>
    );
}

export default Doorway1Part2;