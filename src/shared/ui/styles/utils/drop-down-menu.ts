import { css } from 'styled-components';

export const dropDownMenuDefaultStyle = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 16px 10px;

  background: ${({ theme }) => theme.color.white_FFFFFF};
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 8%);

  /* box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%); */
`;

/**
 * position을 통한 위치 잡기는 직접 해주어야 함.
 * - 예시 NicknameWithAvatar.tsx -> DropDownMenu 참고
 */
export const dropDownMenuStyle = css`
  ${dropDownMenuDefaultStyle}

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
        font-weight: 700;
        transition: all 0.15s;
      }

      &.selected {
        font-weight: 700;
      }
    }
  }
`;

export const checkDropDownBoxStyle = css`
  ${dropDownMenuDefaultStyle}
  padding: 27px 30px;

  display: flex;
  align-items: center;
  flex-flow: row wrap;
  gap: 16px 0;

  li {
    width: 50%;
    min-width: 94px;

    & > div {
      width: 100%;
    }

    label {
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 1.6rem;
      color: ${({ theme }) => theme.color.gray_9E9E9E};

      &:hover {
        font-weight: 700;
        transition: all 0.15s;
      }

      &.selected {
        font-weight: 700;
      }
    }
  }
`;
