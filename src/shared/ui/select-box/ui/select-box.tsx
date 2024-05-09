import { MouseEvent } from 'react';

import styled from 'styled-components';

import { gray9E9E9EArrowDownIcon, gray9E9E9EArrowUpIcon } from '@shared/ui/styles/icon/arrow-icon';

interface SelectBoxProps {
  selectedName?: string;
  handleClick: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  isOpened: boolean;
  className?: string;
}

const SelectBox = ({ selectedName, handleClick, isOpened = false, className }: SelectBoxProps) => {
  return (
    <SSelectBox type='button' onClick={handleClick} $isOpened={isOpened} className={className || ''}>
      <span>{selectedName}</span>
      <div className='arrow-icon-box' />
    </SSelectBox>
  );
};

export { SelectBox };

interface SSelectBoxType {
  $isOpened: boolean;
}

const SSelectBox = styled.button<SSelectBoxType>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 9px 10px;

  background: ${({ theme }) => theme.color.white_FFFFFF};
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  span {
    width: calc(100% - 15px);

    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
    text-align: center;
  }

  .arrow-icon-box {
    position: relative;
    display: block;
    width: 15px;
    height: 15px;

    &::after {
      content: '';
      ${(props) => {
        if (props.$isOpened) {
          return gray9E9E9EArrowUpIcon;
        }

        return gray9E9E9EArrowDownIcon;
      }};
    }
  }

  &.active {
    border: 1px solid ${({ theme }) => theme.color.blue_43ADFF};

    span {
      color: ${({ theme }) => theme.color.blue_43ADFF};
    }

    img {
      fill: ${({ theme }) => theme.color.blue_43ADFF};
    }

    .arrow-icon-box {
      &::after {
        border-color: ${({ theme }) => theme.color.blue_43ADFF};
      }
    }
  }
`;
