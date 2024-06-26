import styled from 'styled-components';

export const ProductPage = styled.div`
  width: 95%;
  max-width: 1194px;
  margin: 0 auto;
  padding-bottom: 180px;
`;

export const SearchArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 58px 0 0;
`;

export const filterArea = styled.section`
  position: relative;
`;

export const SearchSortingContainer = styled.div`
  width: 100%;
  max-width: 1194px;
  margin-top: 40px;

  h2 {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 28px;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }

  strong {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 28px;
    color: ${({ theme }) => theme.color.blue_43ADFF};
  }
`;

export const SelectBoxArea = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 60px 0 20px;

  p {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }
`;

export const CardListArea = styled.section`
  position: relative;
`;
