import styled from 'styled-components';

interface CommonButtonStyleProps {
  $borderRadius?: string;
  $backgroundColor?: string;
  $maxWidth?: string;
  $fontSize?: string;
  $fontColor?: string;
  $fontWeight?: string;
  $padding?: string;
}

export const CommonButton = styled.button<CommonButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${(props) => props.$maxWidth};
  margin: 10px;
  padding: ${(props) => props.$padding};

  font-size: ${(props) => props.$fontSize};
  font-weight: ${(props) => props.$fontWeight};
  color: ${(props) => props.$fontColor};

  background-color: ${(props) => props.$backgroundColor};
  border-radius: ${(props) => props.$borderRadius};
`;
