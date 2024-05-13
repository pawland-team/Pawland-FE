import { css } from 'styled-components';

export const ArrowIcon = css`
  position: absolute;
  top: 50%;
  left: 50%;

  display: inline-block;

  padding: 3px;

  border: solid black;
  border-width: 0 2px 2px 0;
`;

export const gray9E9E9EArrowDownIcon = css`
  ${ArrowIcon}
  transform-origin: top left;
  -webkit-transform: rotate(45deg) translate(-50%, -72%);
  transform: rotate(45deg) translate(-50%, -72%);
  border-color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

export const gray9E9E9EArrowUpIcon = css`
  ${ArrowIcon}
  transform-origin: top left;
  -webkit-transform: rotate(-135deg) translate(-64%, -72%);
  transform: rotate(-135deg) translate(-64%, -72%);
  border-color: ${({ theme }) => theme.color.gray_9E9E9E};
`;
