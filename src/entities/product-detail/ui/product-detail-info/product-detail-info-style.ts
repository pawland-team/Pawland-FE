import styled from 'styled-components';

export const ProductDetailInfoStyle = styled.div`
  padding: 42px 44px;
  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 10px;
`;

export const SubInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
