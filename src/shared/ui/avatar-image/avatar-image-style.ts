import styled from 'styled-components';

interface AvatarStyleProps {
  $avatarBorderRadius?: number;
  $avatarWidth?: number;
  $avatarHeight?: number;
}

export const AvatarImage = styled.div<AvatarStyleProps>`
  overflow: hidden;
  display: block;

  width: ${(props) => props.$avatarWidth}px;
  height: ${(props) => props.$avatarHeight}px;

  border-radius: ${(props) => props.$avatarBorderRadius}px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
