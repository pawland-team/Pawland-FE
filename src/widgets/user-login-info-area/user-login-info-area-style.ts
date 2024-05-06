import styled from 'styled-components';

export const UserLoginInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  margin-top: 40px;
`;

export const LoginInfo = styled.div`
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 28px;
`;

export const LogoutButton = styled.button`
  width: 200px;
  height: 50px;

  color: white;

  background-color: black;
  border-radius: 10px;
`;
