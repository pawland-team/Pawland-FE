/* stylelint-disable plugin/no-unsupported-browser-features */

import styled from 'styled-components';

import { grayCheckIcon } from '@shared/ui/styles/icon';

export const BorderCheckBoxContainer = styled.div`
  position: relative;

  overflow: hidden;
  display: inline-flex;
  gap: 6px;
  align-items: center;

  padding: 7px 18px;

  border: 1px solid #e0e0e0;
  border-radius: 6px;

  label {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }

  input {
    cursor: pointer;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    appearance: none;
  }

  .checkbox {
    position: relative;
    width: 20px;
    height: 20px;

    &::after {
      content: '';
      ${grayCheckIcon}
    }

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &.checked {
    border-color: ${({ theme }) => theme.color.blue_43ADFF};

    label {
      color: ${({ theme }) => theme.color.blue_43ADFF};
    }

    .checkbox {
      &::after {
        border-color: ${({ theme }) => theme.color.blue_43ADFF};
      }
    }
  }
`;
