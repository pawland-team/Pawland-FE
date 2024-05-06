import styled from 'styled-components';

export const UserRegisteredProductList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 110px;
`;
export const TitleArea = styled.div`
  display: flex;
  justify-content: start;
`;
export const Title = styled.span`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 38px;
`;

export const Line = styled.hr`
  border: 0.8px solid ${({ theme }) => theme.color.black_000000};
  margin-top: 21px;
`;
export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 16px;

  width: 1194px;
  margin-top: 40px;
  margin-left: 25px;
`;
