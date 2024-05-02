import { MouseEvent } from 'react';

import { RoundedCancelButton } from '@shared/ui/buttons';

import * as S from './selected-filter-manage-box-style';

interface SelectedFilterManageBoxProps {
  selectedValueList: string[];
  handleClick: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const SelectedFilterManageBox = ({ selectedValueList, handleClick }: SelectedFilterManageBoxProps) => {
  if (selectedValueList.length <= 0) {
    return;
  }

  return (
    <S.SelectedFilterManageBoxStyle role='group'>
      {selectedValueList.map((selected) => (
        <RoundedCancelButton key={selected} selectedValue={selected} handleClick={handleClick} />
      ))}
    </S.SelectedFilterManageBoxStyle>
  );
};

export { SelectedFilterManageBox };
