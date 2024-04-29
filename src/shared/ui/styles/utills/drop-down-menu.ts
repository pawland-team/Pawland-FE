import { css } from 'styled-components';

export const dropDownMenuStyle = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 120px;
  padding: 16px 10px;

  background: ${({ theme }) => theme.color.white_FFFFFF};
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 8%);

  /* box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%); */

  li {
    width: 100%;
    font-size: 1.4rem;

    & ~ li {
      &::before {
        content: '';

        display: block;

        width: 100%;
        height: 1px;
        margin: 12px 0;

        background: ${({ theme }) => theme.color.gray_BDBDBD};
      }
    }

    a,
    button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      font-size: 1.4rem;
      color: ${({ theme }) => theme.color.gray_9E9E9E};

      &:hover {
        color: ${({ theme }) => theme.color.black_000000};
        transition: all 0.15s;
      }
    }
  }
`;
