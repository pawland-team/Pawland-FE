import styled from 'styled-components';

interface CommonButtonStyleProps {
  $borderRadius?: number;
  $backgroundColor?: string;
  $width?: number;
  $fontSize?: string;
  $fontColor?: string;
  $fontWeight?: number;
  $padding?: string;
}

export const CommonButton = styled.button<CommonButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${(props) => props.$width}px;
  margin: 10px;
  padding: ${(props) => props.$padding};

  font-size: ${(props) => props.$fontSize}rem;
  font-weight: ${(props) => props.$fontWeight};
  color: ${(props) => props.$fontColor};

  background-color: ${(props) => props.$backgroundColor};
  border-radius: ${(props) => props.$borderRadius}px;
`;
