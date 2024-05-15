import styled from 'styled-components';

interface DropdownButtonStyleProps {
  $width?: string;
  $buttonHeight?: string;
  $borderColor?: string;
  $fontColor?: string;
  $selectedFontSize?: string;
}

export const DropdownButton = styled.div<DropdownButtonStyleProps>`
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: ${(props) => props.$width};
  height: ${(props) => props.$buttonHeight};
  padding-right: 8px;
  padding-left: 15px;

  color: ${(props) => props.$fontColor};

  border: 1px solid;
  border-color: ${(props) => props.$borderColor};
  border-radius: 5px;
`;

export const SelectedMenu = styled.div<DropdownButtonStyleProps>`
  font-size: ${(props) => props.$selectedFontSize};
  font-weight: 600;
`;

export const DropdownMenuList = styled.div<DropdownButtonStyleProps>`
  position: absolute;
  top: 100%;
  left: 0;

  display: flex;
  flex-direction: column;

  width: ${(props) => props.$width};
  padding-right: 17px;
  padding-left: 17px;

  background-color: ${({ theme }) => theme.color.white_FFFFFF};
  border: 1px solid;
  border-color: ${(props) => props.$borderColor};
  border-radius: 5px;
`;

export const DropdownMenu = styled.div<DropdownButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 44px;

  font-size: 1.4rem;
  font-weight: 200;

  border-color: ${(props) => props.$borderColor};
  border-bottom: 1px solid;

  &:hover {
    font-weight: 700;
  }
`;

export const LastDropdownMenu = styled(DropdownMenu)`
  border-bottom: 0;
`;
