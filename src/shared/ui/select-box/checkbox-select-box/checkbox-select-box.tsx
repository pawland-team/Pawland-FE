import { ChangeEvent, useRef, useState } from 'react';

import { useOutsideClick } from '@shared/hooks/use-outside-click';
import { CommonCheckBox } from '@shared/ui/checkbox';
import { MainCategoryItemDto } from '@widgets/product-category-filter/product-category-data';
import { useCheckedCategoryStore } from '@widgets/product-list-filter-container/model';

import * as S from './checkbox-select-box-style';
import { CheckDropDownBox } from '../ui/check-drop-down-box';
import { SelectBox } from '../ui/select-box';

interface CheckboxSelectBoxProps {
  categoryList: MainCategoryItemDto;
  // handleChangeCheckBox: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 *
 * - 셀렉트 박스 + 체크박스 컴포넌트
 * - categoryList로 체크박스 렌더링 되어야하는 리스트 배열을 넘겨줘야함.
 * - 예시는 상품 리스트에서 체크
 *
 */

const CheckboxSelectBox = ({ categoryList }: CheckboxSelectBoxProps) => {
  const dropDownRef = useRef(null);
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { addSelectedValue } = useCheckedCategoryStore();

  // const [isChecked, setIsChecked] = useState(false);
  const handleAddCheckedValue = (e: ChangeEvent<HTMLInputElement>) => {
    // target input의 checked 상태를 클릭할 때 마다 toggle 시킨다.
    console.log(e);
    addSelectedValue(e.target.id);
    setIsChecked((prev) => !prev);
  };
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
              <CommonCheckBox
                label={checkbox.label}
                isChecked={isChecked}
                group={categoryList.group}
                handleChangeCheckBox={handleAddCheckedValue}
              />
            </li>
          ))}
        </CheckDropDownBox>
      )}
    </S.CheckboxSelectBoxStyle>
  );
};

export { CheckboxSelectBox };
