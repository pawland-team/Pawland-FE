import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;

  font-size: 1.8rem;
  color: ${({ theme }) => theme.color.blue_43ADFF};
`;

export const NumberButton = styled.button`
  color: ${({ theme }) => theme.color.gray_9E9E9E};

  &.active {
    font-weight: 700;
    color: ${({ theme }) => theme.color.black_000000};
  }

  &:hover {
    color: ${({ theme }) => theme.color.black_000000};
  }
`;

export const ArrowButton = styled.button`
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
