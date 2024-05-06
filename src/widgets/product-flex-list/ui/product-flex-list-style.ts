import styled from 'styled-components';

interface ProductFlexListProps {
  $cardListFlexGap: string;
  $flexWrap: string;
}

export const ProductFlexListContainer = styled.div<ProductFlexListProps>`
  display: flex;
  flex-wrap: ${(props) => props.$flexWrap};
  gap: ${(props) => props.$cardListFlexGap};
  align-items: center;
`;
