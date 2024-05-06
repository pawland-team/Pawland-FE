import { MouseEvent } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

interface SelectBoxProps {
  selectedName?: string;
  handleClick: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  isOpened: boolean;
}

const SelectBox = ({ selectedName, handleClick, isOpened = false }: SelectBoxProps) => {
  return (
    <SSelectBox type='button' onClick={handleClick} $isOpened={isOpened}>
      <span>{selectedName}</span>
      <Image alt='화살표 아이콘' src='/images/icon/arrow-down-icon-9E9E9E.svg' width={15} height={15} />
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

  ${(props) => {
    if (props.$isOpened) {
      return `img {transform: rotate(180deg)}`;
    }

    return '';
  }}
`;
