import styled from 'styled-components';

interface ProductListProps {
  $cardListFlexGap: string;
  $flexWrap: string;
}

export const ProductListContainer = styled.div<ProductListProps>`
  display: flex;
  flex-wrap: ${(props) => props.$flexWrap};
  gap: ${(props) => props.$cardListFlexGap};
  align-items: center;
`;
