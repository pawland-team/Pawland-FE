import styled from 'styled-components';

interface RoundedArrowButtonStyleProps {
  $ButtonSize: number;
  $direction: 'left' | 'right' | 'up' | 'down';
}

export const RoundedArrowButtonStyle = styled.button<RoundedArrowButtonStyleProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => props.$ButtonSize}px;
  height: ${(props) => props.$ButtonSize}px;

  background-color: ${({ theme }) => theme.color.white_FFFFFF};
  border: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 50px;

  ${(props) => {
    if (props.$direction === 'right') {
      return `transform: rotate(-90deg); -webkit-transform: rotate(-90deg);`;
    }

    if (props.$direction === 'up') {
      return `transform: rot0ate(-180deg); -webkit-transform: rotate(-180deg);`;
    }

    if (props.$direction === 'left') {
      return `transform: rotate(90deg); -webkit-transform: rotate(90deg);`;
    }
  }}
`;
