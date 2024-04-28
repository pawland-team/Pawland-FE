import styled from 'styled-components';

export const RegisteredProductItem = styled.div`
  display: flex;
  padding: 20px 26px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  cursor: pointer;

  &:hover {
    box-shadow: 4px 4px 4px 0 rgb(0 0 0 / 5%);
  }
`;
