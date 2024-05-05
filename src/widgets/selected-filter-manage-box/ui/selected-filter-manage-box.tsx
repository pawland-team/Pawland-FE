import { ChangeEvent } from 'react';

import { RoundedCancelButton } from '@shared/ui/buttons';

import * as S from './selected-filter-manage-box-style';

interface SelectedFilterManageBoxProps {
  selectedValueList: {
    group: string;
    value: string;
    isChecked: boolean;
  }[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SelectedFilterManageBox = ({ selectedValueList, handleChange }: SelectedFilterManageBoxProps) => {
  if (selectedValueList.length <= 0) {
    return;
  }

  return (
    <S.SelectedFilterManageBoxStyle role='group'>
      {selectedValueList.map((selected) => (
        <RoundedCancelButton
          key={selected.value}
          selectedValue={selected.value}
          selectedName={selected.group}
          handleChange={handleChange}
        />
      ))}
    </S.SelectedFilterManageBoxStyle>
  );
};

export { SelectedFilterManageBox };
