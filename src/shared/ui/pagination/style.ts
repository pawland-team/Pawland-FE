import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;

  margin-top: 13px;

  font-size: 1.8rem;
  color: ${({ theme }) => theme.color.blue_43ADFF};
`;
