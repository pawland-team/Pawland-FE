import { css, keyframes } from 'styled-components';

const dashKeyframes = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

export const dash = css`
  animation: ${dashKeyframes} 1.5s ease-in-out infinite;
`;
