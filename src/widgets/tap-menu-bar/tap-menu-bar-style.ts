import styled from 'styled-components';

export const TapMenuBar = styled.div`
  display: flex;
  gap: 9px;
`;

export const MenuButton = styled.button<{ $isActive: boolean }>`
  padding: 3px 14px;

  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ $isActive, theme }) => ($isActive ? theme.color.black_000000 : theme.color.gray_BDBDBD)};

  border-bottom: 2px solid ${({ $isActive, theme }) => ($isActive ? theme.color.black_000000 : theme.color.gray_BDBDBD)};

  &:hover {
    color: ${({ theme }) => theme.color.black_000000};
    border-bottom: 2px solid ${({ theme }) => theme.color.black_000000};
  }
`;
