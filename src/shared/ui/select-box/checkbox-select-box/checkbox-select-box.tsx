import { useState } from 'react';

import { CommonCheckBox } from '@shared/ui/checkbox';
import { MainCategoryItemDto } from '@widgets/product-category-filter/product-category-data';

import * as S from './checkbox-select-box-style';
import { DropDownBox } from '../ui/drop-down-box';
import { SelectBox } from '../ui/select-box';

interface CheckboxSelectBoxProps {
  categoryList: MainCategoryItemDto;
}

const CheckboxSelectBox = ({ categoryList }: CheckboxSelectBoxProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClickOpenSelectBox = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <S.CheckboxSelectBoxStyle>
      <SelectBox handleClick={handleClickOpenSelectBox} isOpened={isOpened} />
      {isOpened && (
        <DropDownBox maxWidth='290px'>
          {categoryList.item.map((checkbox) => (
            <CommonCheckBox
              key={checkbox.label}
              label={checkbox.label}
              checked={checkbox.checked}
              group={categoryList.group}
            />
          ))}
        </DropDownBox>
      )}
    </S.CheckboxSelectBoxStyle>
  );
};

export { CheckboxSelectBox };
