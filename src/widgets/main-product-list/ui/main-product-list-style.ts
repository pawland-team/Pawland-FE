import styled from 'styled-components';

export const ProductListArea = styled.section`
  width: 100%;

  .product-title-box {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 38px;

    h3 {
      font-size: 2.8rem;
      font-weight: 700;
    }

    a {
      font-size: 1.6rem;
      font-weight: 400;
      text-decoration: underline;
    }
  }
`;

export const NoProductBox = styled.div`
  display: block;
  padding: 100px 0;
  text-align: center;

  p {
    margin-top: 35px;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }

  a {
    display: block;

    margin-top: 12px;

    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.color.blue_43ADFF};
    text-decoration: underline;
  }
`;
