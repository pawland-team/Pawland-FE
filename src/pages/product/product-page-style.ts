import styled from 'styled-components';

export const ProductPage = styled.div`
  width: 95%;
  max-width: 1194px;
  margin: 0 auto;
`;

export const SearchInputArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 58px 0 40px;
`;

export const SearchSortingContainer = styled.div`
  width: 100%;
  max-width: 1194px;
  margin-top: 40px;

  h2 {
    margin-bottom: 20px;

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

export const CardListArea = styled.section`
  margin: 80px 0;
`;
