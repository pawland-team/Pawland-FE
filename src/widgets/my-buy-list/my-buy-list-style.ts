import styled from 'styled-components';

export const TransactionHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 744px;
  margin-top: 40px;

  .button-area {
    display: flex;
    justify-content: end;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;

  margin-top: 13px;

  font-size: 1.8rem;
  color: ${({ theme }) => theme.color.blue_43ADFF};
`;
