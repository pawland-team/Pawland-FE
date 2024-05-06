import styled from 'styled-components';

export const RegisterProductButton = styled.div`
  display: flex;
  gap: 12px;

  width: 100%;
  height: 64px;
  padding: 20px 67px;

  background-color: ${({ theme }) => theme.color.blue_43ADFF};
  border-radius: 41px;

  div {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.color.white_FFFFFF};
  }
`;
