import styled from 'styled-components';

export const WishList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 16px;

  width: 744px;
  margin-top: 40px;
  margin-left: 25px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;

  margin-top: 13px;
  margin-left: 330px;

  font-size: 1.8rem;
  color: ${({ theme }) => theme.color.blue_43ADFF};
`;
