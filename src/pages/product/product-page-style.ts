import styled from 'styled-components';

export const ProductPage = styled.div`
  width: 95%;
  max-width: 1194px;
  margin: 0 auto;
`;

export const SearchArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 58px 0 0;
`;

export const filterArea = styled.section`
  .filter-select-container {
    display: flex;
    gap: 14px;
    align-items: center;
    margin: 20px 0;
  }
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
  justify-content: flex-end;
  margin: 60px 0 20px;
`;

export const CardListArea = styled.section`
  margin: 0 0 80px;
`;
