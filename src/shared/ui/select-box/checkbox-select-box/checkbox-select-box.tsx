import { useRef, useState } from 'react';

import { useOutsideClick } from '@shared/hooks/use-outside-click';
import { CommonCheckBox } from '@shared/ui/checkbox';
import { MainCategoryItemDto } from '@widgets/product-category-filter/product-category-data';

import * as S from './checkbox-select-box-style';
import { CheckDropDownBox } from '../ui/check-drop-down-box';
import { SelectBox } from '../ui/select-box';

interface CheckboxSelectBoxProps {
  categoryList: MainCategoryItemDto;
}

const CheckboxSelectBox = ({ categoryList }: CheckboxSelectBoxProps) => {
  const dropDownRef = useRef(null);
  const [isSelectOpened, setIsSelectOpened] = useState(false);

  useOutsideClick(dropDownRef, isSelectOpened, setIsSelectOpened);

  const handleClickOpenSelectBox = () => {
    setIsSelectOpened((prev) => !prev);
  };

  return (
    <S.CheckboxSelectBoxStyle ref={dropDownRef}>
      <SelectBox handleClick={handleClickOpenSelectBox} isOpened={isSelectOpened} selectedName={categoryList.group} />
      {isSelectOpened && (
        <CheckDropDownBox width='290px' ariaLabelledBy={categoryList.group}>
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
