import styled from 'styled-components';

export const TransactionItem = styled.div`
  width: 100%;
  padding: 20px 26px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  cursor: pointer;

  &:hover {
    box-shadow: 4px 4px 4px 0 rgb(0 0 0 / 5%);
  }
`;

export const ProductArea = styled.div`
  display: flex;
  gap: 27px;
`;

export const ItemInfoArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  span {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.gray_BDBDBD};
    line-height: 18px;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 2.4rem;
      max-width: 420px;
      line-height: 34px;
    }
    p {
      font-size: 3.2rem;
      font-weight: 700;
      line-height: 42px;
    }
  }
`;
