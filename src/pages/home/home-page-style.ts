import styled from 'styled-components';

export const HomePage = styled.div`
  width: 95%;
  max-width: 1194px;
  margin: 0 auto;
  padding-bottom: 100px;

  font-weight: 700;
`;

export const SwiperArea = styled.section`
  margin-top: 58px;
`;

export const InputArea = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 48px 0;
`;

export const CategoryArea = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-bottom: 62px;
`;

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
