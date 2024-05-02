import styled from 'styled-components';

export const RegisteredProductItem = styled.div`
  cursor: pointer;

  display: flex;
  gap: 27px;

  width: 100%;
  padding: 20px 26px;

  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 6px;

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

  .text-area {
    justify-content: space-between;
    margin-top: 15px;

    span {
      font-size: 1.6rem;
      line-height: 28px;
      color: ${({ theme }) => theme.color.gray_9E9E9E};
    }

    p {
      font-size: 3.2rem;
      font-weight: 700;
      line-height: 42px;
    }
  }
`;
