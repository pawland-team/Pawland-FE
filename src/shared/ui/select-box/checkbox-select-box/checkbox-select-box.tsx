import { ChangeEvent, useRef, useState } from 'react';

import { useOutsideClick } from '@shared/hooks/use-outside-click';
import { CommonCheckBox } from '@shared/ui/checkbox';
import { CategoryItemList } from '@widgets/product-list-filter-container/model/store';

import * as S from './checkbox-select-box-style';
import { CheckDropDownBox } from '../ui/check-drop-down-box';
import { SelectBox } from '../ui/select-box';

interface CheckboxSelectBoxProps {
  selectBoxCategory: string;
  categoryList: CategoryItemList;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 *
 * - 셀렉트 박스 + 체크박스 컴포넌트
 * - categoryList로 체크박스 렌더링 되어야하는 리스트 배열을 넘겨줘야함.
 * - 예시는 상품 리스트에서 체크
 *
 */

const CheckboxSelectBox = ({ selectBoxCategory, categoryList, handleChange }: CheckboxSelectBoxProps) => {
  const dropDownRef = useRef(null);
  const [isSelectOpened, setIsSelectOpened] = useState(false);

  useOutsideClick(dropDownRef, isSelectOpened, setIsSelectOpened);

  const handleClickOpenSelectBox = () => {
    setIsSelectOpened((prev) => !prev);
  };

  return (
    <S.CheckboxSelectBoxStyle ref={dropDownRef}>
      <SelectBox handleClick={handleClickOpenSelectBox} isOpened={isSelectOpened} selectedName={selectBoxCategory} />
      {isSelectOpened && (
        <CheckDropDownBox width='290px' ariaLabelledBy={categoryList.category}>
          {categoryList?.data.map((checkbox) => (
            <li key={checkbox.value}>
              <CommonCheckBox
                label={checkbox.value}
                isChecked={checkbox.isChecked}
                group={categoryList.category}
                handleChangeCheckBox={handleChange}
              />
            </li>
          ))}
        </CheckDropDownBox>
      )}
    </S.CheckboxSelectBoxStyle>
  );
};

export { CheckboxSelectBox };
