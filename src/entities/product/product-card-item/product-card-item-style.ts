import styled from 'styled-components';

interface ProductCardItemStyleProps {
  $flexGap: number;
  $cardNumberPerRow: number;
}

export const ProductCardItem = styled.div<ProductCardItemStyleProps>`
  overflow: hidden;
  width: ${(props) => `calc(100% / ${props.$cardNumberPerRow} - ${props.$flexGap}px)`};
  border-radius: 12px;
`;
