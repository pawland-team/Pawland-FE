import styled from 'styled-components';

interface ProductFlexCardItemStyleProps {
  $flexGap: number;
  $cardNumberPerRow: number;
}

export const ProductFlexCardItem = styled.div<ProductFlexCardItemStyleProps>`
  overflow: hidden;
  width: ${(props) => `calc(100% / ${props.$cardNumberPerRow} - ${props.$flexGap}px)`};
  border-radius: 12px;
`;
