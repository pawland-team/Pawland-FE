import styled from 'styled-components';

export const EditProfileButton = styled.div`
  position: absolute;
  top: 90px;
  left: 520px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  background-color: ${({ theme }) => theme.color.white_FFFFFF};
  border-radius: 50%;
  box-shadow: 1px 1px 5px 0 rgb(0 0 0 / 15%);
`;
