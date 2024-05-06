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
