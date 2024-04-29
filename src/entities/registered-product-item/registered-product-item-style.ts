import styled from 'styled-components';

export const RegisteredProductItem = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 26px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  cursor: pointer;
  gap: 27px;

  &:hover {
    box-shadow: 4px 4px 4px 0 rgb(0 0 0 / 5%);
  }
`;

export const ItemInfoArea = styled.div`
  width: 100%;
  margin-top: 14px;
  div {
    display: flex;
    gap: 14px;

    h1 {
      font-size: 2.4rem;
    }
  }

  .textArea {
    margin-top: 15px;
    justify-content: space-between;

    span {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.color.gray_9E9E9E};
      line-height: 28px;
    }

    p {
      font-size: 3.2rem;
      line-height: 42px;
      font-weight: 700;
    }
  }
`;
