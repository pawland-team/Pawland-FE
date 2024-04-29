import styled from 'styled-components';

export const ProfilePageMenuBar = styled.div`
  display: flex;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 15%);
  width: fit-content;
`;

interface MenuButtonProps {
  isActive: boolean;
}

export const MenuButton = styled.button<MenuButtonProps>`
  width: 134px;
  height: 48px;
  padding: 10px 12px;

  font-size: 1.6rem;
  font-weight: 400;

  border-right: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};

  background-color: ${({ isActive, theme }) => (isActive ? theme.color.blue_43ADFF : 'transparent')};

  color: ${({ isActive, theme }) => (isActive ? theme.color.white_FFFFFF : theme.color.black_000000)};

  &:hover {
    color: ${({ theme }) => theme.color.white_FFFFFF};
    background-color: ${({ theme }) => theme.color.blue_43ADFF};
  }
`;
export const FirstMenuButton = styled(MenuButton)`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
export const LastMenuButton = styled(MenuButton)`
  border-right: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
