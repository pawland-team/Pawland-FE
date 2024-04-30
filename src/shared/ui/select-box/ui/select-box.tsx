import { MouseEvent } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

interface SelectBoxProps {
  selectedName?: string;
  handleClick: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const SelectBox = ({ selectedName, handleClick }: SelectBoxProps) => {
  return (
    <StyleSelectBox type='button' onClick={handleClick}>
      <span>{selectedName}</span>
      <Image alt='화살표 아이콘' src='/images/icon/arrow-down-icon-9E9E9E.svg' width={10} height={10} />
    </StyleSelectBox>
  );
};

export { SelectBox };

const StyleSelectBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 8px 17px;

  background: ${({ theme }) => theme.color.white_FFFFFF};
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  span {
    min-width: 64px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
    text-align: center;
  }
`;
