import styled from 'styled-components';

export const ProductDetailPage = styled.div`
  padding: 58px 0 80px;
`;

export const DetailArticleArea = styled.article`
  width: 95%;
  max-width: 1194px;
  margin: 0 auto;
`;

export const RecentProductArea = styled.section`
  width: 95%;
  max-width: 1340px;
  margin: 0 auto;
`;

export const DivideLine = styled.div`
  width: 100%;
  height: 1px;
  margin: 77px 0;
  background-color: ${({ theme }) => theme.color.gray_BDBDBD};
`;
