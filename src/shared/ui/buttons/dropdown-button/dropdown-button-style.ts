import styled from 'styled-components';

interface DropdownButtonStyleProps {
  $width?: string;
  $buttonHeight?: string;
  $borderColor?: string;
  $fontColor?: string;
  $selectedFontSize?: string;
}

export const DropdownButton = styled.div<DropdownButtonStyleProps>`
  display: flex;
  width: ${(props) => props.$width};
  height: ${(props) => props.$buttonHeight};
  border: 1px solid;
  border-color: ${(props) => props.$borderColor};
  color: ${(props) => props.$fontColor};

  border-radius: 5px;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 8px;
  position: relative;
  cursor: pointer;
  align-items: center;
`;

export const SelectedMenu = styled.div<DropdownButtonStyleProps>`
  font-size: ${(props) => props.$selectedFontSize};
  font-weight: 600;
`;

export const DropdownMenuList = styled.div<DropdownButtonStyleProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.$width};
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid;
  border-color: ${(props) => props.$borderColor};
  border-radius: 5px;
  padding-left: 17px;
  padding-right: 17px;
  background-color: ${({ theme }) => theme.color.white_FFFFFF};
`;

export const DropdownMenu = styled.div<DropdownButtonStyleProps>`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  font-weight: 200;
  border-bottom: 1px solid;
  border-color: ${(props) => props.$borderColor};

  &:hover {
    font-weight: 700;
  }
`;

export const LastDropdownMenu = styled(DropdownMenu)`
  border-bottom: 0;
`;
