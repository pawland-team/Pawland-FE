import Link from 'next/link';
import styled from 'styled-components';

interface CommonButtonStyleProps {
  $borderRadius?: string;
  $backgroundColor?: string;
  $maxWidth?: string;
  $fontSize?: string;
  $fontColor?: string;
  $fontWeight?: string;
  $padding?: string;
  $borderColor?: string;
  $borderWidth?: string;
}

export const CommonButton = styled.button<CommonButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${(props) => props.$maxWidth};
  padding: ${(props) => props.$padding};

  font-size: ${(props) => props.$fontSize};
  font-weight: ${(props) => props.$fontWeight};
  color: ${(props) => props.$fontColor};

  background-color: ${(props) => props.$backgroundColor};
  border-radius: ${(props) => props.$borderRadius};

  ${(props) => {
    if (props.$borderColor && props.$borderWidth) {
      return `
        border: ${props.$borderWidth} solid ${props.$borderColor};
      `;
    }
  }}

  &:disabled {
    cursor: not-allowed;
    color: #fff;
    background-color: ${({ theme }) => theme.color.gray_BDBDBD};
  }
`;

export const CommonLinkButton = styled(Link)<CommonButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${(props) => props.$maxWidth};
  padding: ${(props) => props.$padding};

  font-size: ${(props) => props.$fontSize};
  font-weight: ${(props) => props.$fontWeight};
  color: ${(props) => props.$fontColor};

  background-color: ${(props) => props.$backgroundColor};
  border-radius: ${(props) => props.$borderRadius};

  ${(props) => {
    if (props.$borderColor && props.$borderWidth) {
      return `
        border: ${props.$borderWidth} solid ${props.$borderColor};
      `;
    }
  }}

  &:disabled {
    cursor: not-allowed;
    color: #fff;
    background-color: ${({ theme }) => theme.color.gray_BDBDBD};
  }
`;
