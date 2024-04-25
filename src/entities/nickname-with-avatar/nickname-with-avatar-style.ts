import styled from 'styled-components';

export const NicknameWithAvatar = styled.div`
  cursor: pointer;
  position: relative;
`;

export const NickNameImageBox = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  font-size: 1.6rem;
  color: #242424;
`;

export const DropDownMenu = styled.ul`
  position: absolute;
  top: 120%;
  right: 0;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 120px;

  background: ${({ theme }) => theme.color.white_FFFFFF};
  border-radius: 6px;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 8%);

  /* box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); */

  li {
    width: 100%;
    font-size: 1.4rem;

    /* & ~ li {
      border-top: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
    } */

    a,
    button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;
      padding: 12px 0;

      &:hover {
        color: ${({ theme }) => theme.color.white_FFFFFF};
        background: ${({ theme }) => theme.color.black_000000};
      }
    }
  }
`;
