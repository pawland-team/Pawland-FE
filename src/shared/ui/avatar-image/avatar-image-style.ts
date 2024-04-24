import styled from 'styled-components';

interface AvatarStyleProps {
  $avatarBorderRadius?: string;
  $avatarWidth?: string;
  $avatarHeight?: string;
}

export const AvatarImage = styled.div<AvatarStyleProps>`
  overflow: hidden;
  display: block;

  width: ${(props) => props.$avatarWidth};
  height: ${(props) => props.$avatarHeight};

  border-radius: ${(props) => props.$avatarBorderRadius};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
