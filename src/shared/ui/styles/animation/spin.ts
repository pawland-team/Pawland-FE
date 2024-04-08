import { css, keyframes } from 'styled-components';

const spinKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const spin = css`
  animation: ${spinKeyframes} 2s linear infinite;
`;
