import styled, { keyframes } from 'styled-components';

export const SApp = styled.header`
    background: rgba(255, 255, 255, 1);
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SLogo = styled.img`
    height: 40vmin;
    pointer-events: none;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${spin} infinite 20s linear;
    }
`;

export const SLink = styled.a`
    color: #61dafb;
`;
