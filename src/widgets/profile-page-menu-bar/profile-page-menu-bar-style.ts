import styled from 'styled-components';

export const ProfilePageMenuBar = styled.div`
  display: flex;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 15%);
`;
export const BaseMenuButton = styled.button`
  width: 134px;
  height: 48px;
  padding: 10px 12px;

  font-size: 1.6rem;
  font-weight: 400;

  border-right: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};

  &:hover {
    color: ${({ theme }) => theme.color.white_FFFFFF};
    background-color: ${({ theme }) => theme.color.blue_2087D6};
  }
`;
export const FirstMenuButton = styled(BaseMenuButton)`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
export const LastMenuButton = styled(BaseMenuButton)`
  border-right: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
