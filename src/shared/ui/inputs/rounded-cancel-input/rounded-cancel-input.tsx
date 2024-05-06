import { ChangeEvent } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

interface RoundedCancelInputProps {
  selectedValue: string;
  selectedName: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RoundedCancelInput = ({ selectedName, selectedValue, handleChange }: RoundedCancelInputProps) => {
  return (
    <SRoundedCancelInput>
      <input type='checkbox' name={selectedName} onChange={handleChange} id={selectedValue} />
      <label>{selectedValue}</label>
      <Image src='/images/icon/button-close-icon.svg' width={18} height={18} alt='선택 삭제 아이콘' />
    </SRoundedCancelInput>
  );
};

export { RoundedCancelInput };

const SRoundedCancelInput = styled.div`
  position: relative;

  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;

  padding: 9px 8px;

  background-color: ${({ theme }) => theme.color.blue_43ADFF};
  border-radius: 60px;

  input {
    cursor: pointer;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    appearance: none;
  }

  label {
    min-width: 59px;

    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1;
    color: ${({ theme }) => theme.color.white_FFFFFF};
    text-align: center;
  }
`;
