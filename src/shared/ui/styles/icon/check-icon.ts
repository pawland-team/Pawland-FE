import { css } from 'styled-components';

export const grayCheckIcon = css`
  position: absolute;
  top: -4px;
  left: 0;
  transform-origin: bottom left;
  transform: rotate(45deg);

  display: block;

  box-sizing: border-box;
  width: 8px;
  height: 14px;

  border-color: ${({ theme }) => theme.color.gray_9E9E9E};
  border-style: solid;
  border-width: 0 2px 2px 0;
`;
