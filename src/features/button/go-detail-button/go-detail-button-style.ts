import styled from 'styled-components';

export const GoDetailButton = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  div {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }
`;
