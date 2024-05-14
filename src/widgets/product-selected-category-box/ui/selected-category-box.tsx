import { ChangeEvent } from 'react';

import Image from 'next/image';

import { RoundedCancelInput } from '@shared/ui/inputs';
import { useCheckedCategoryStore } from '@widgets/product-list-filter-container/model';

import * as S from './style';

interface SelectedCategoryBoxProps {
  selectedValueList: {
    group: string;
    value: string;
    isChecked: boolean;
  }[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SelectedCategoryBox = ({ selectedValueList, handleChange }: SelectedCategoryBoxProps) => {
  const { clearSelectedValues } = useCheckedCategoryStore();

  const handleClearSelectedValue = () => {
    clearSelectedValues();
  };

  if (selectedValueList.length <= 0) {
    return;
  }

  return (
    <S.SelectedCategoryBoxStyle role='group'>
      <div className='input-list-box'>
        {selectedValueList.map((selected) => (
          <RoundedCancelInput
            key={selected.value}
            selectedValue={selected.value}
            selectedName={selected.group}
            handleChange={handleChange}
          />
        ))}
      </div>
      <div className='clear-box'>
        <button type='button' onClick={handleClearSelectedValue}>
          <Image src='/images/icon/clear-icon.svg' alt='선택 초기화' width={16} height={16} />
          <span>초기화</span>
        </button>
      </div>
    </S.SelectedCategoryBoxStyle>
  );
};

export { SelectedCategoryBox };
