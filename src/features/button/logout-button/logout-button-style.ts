import styled from 'styled-components';

export const LogoutButton = styled.button`
  width: 100%;
  height: 64px;

  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.gray_9E9E9E};

  border: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 41px;
`;
