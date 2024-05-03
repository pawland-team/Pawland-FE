import { MouseEvent } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

interface RoundedCancelButtonProps {
  selectedValue: string;
  handleClick: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const RoundedCancelButton = ({ selectedValue, handleClick }: RoundedCancelButtonProps) => {
  return (
    <SRoundedCancelButton type='button' onClick={handleClick} id={selectedValue}>
      <span>{selectedValue}</span>
      <Image src='/images/icon/button-close-icon.svg' width={18} height={18} alt='선택 삭제 아이콘' />
    </SRoundedCancelButton>
  );
};

export { RoundedCancelButton };

const SRoundedCancelButton = styled.button`
  position: relative;

  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;

  padding: 9px 8px;

  background-color: ${({ theme }) => theme.color.blue_43ADFF};
  border-radius: 60px;

  span {
    min-width: 59px;

    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1;
    color: ${({ theme }) => theme.color.white_FFFFFF};
    text-align: center;
  }
`;
