import styled from 'styled-components';

interface ProductListProps {
  $cardListFlexGap: string;
}

export const ProductListContainer = styled.div<ProductListProps>`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.$cardListFlexGap};
  align-items: center;
`;
