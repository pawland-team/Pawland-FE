import { useState } from 'react';

import { CommonCheckBox } from '@shared/ui/checkbox';
import { MainCategoryItemDto } from '@widgets/product-category-filter/product-category-data';

import * as S from './checkbox-select-box-style';
import { CheckDropDownBox } from '../ui/check-drop-down-box';
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
      <SelectBox handleClick={handleClickOpenSelectBox} isOpened={isOpened} selectedName={categoryList.group} />
      {isOpened && (
        <CheckDropDownBox width='290px'>
          {categoryList.item.map((checkbox) => (
            <li key={checkbox.label}>
              <CommonCheckBox label={checkbox.label} checked={checkbox.checked} group={categoryList.group} />
            </li>
          ))}
        </CheckDropDownBox>
      )}
    </S.CheckboxSelectBoxStyle>
  );
};

export { CheckboxSelectBox };
