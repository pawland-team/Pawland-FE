import styled from 'styled-components';

export const TransactionItem = styled.div`
  cursor: pointer;

  width: 100%;
  padding: 20px 26px;

  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 6px;

  &:hover {
    box-shadow: 4px 4px 4px 0 rgb(0 0 0 / 5%);
  }
`;

export const ProductArea = styled.div`
  display: flex;
  gap: 27px;
`;

export const ItemInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  span {
    font-size: 1.2rem;
    line-height: 18px;
    color: ${({ theme }) => theme.color.gray_BDBDBD};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      max-width: 420px;
      font-size: 2.4rem;
      line-height: 34px;
    }

    p {
      font-size: 3.2rem;
      font-weight: 700;
      line-height: 42px;
    }
  }
`;
