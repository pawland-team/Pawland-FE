import { ChangeEvent } from 'react';

import { BorderCheckBox } from '@shared/ui/checkbox';
import { CheckboxSelectBox } from '@shared/ui/select-box/checkbox-select-box/checkbox-select-box';
import { SelectedCategoryBox } from '@widgets/product-selected-category-box';

import * as S from './product-list-filter-container-style';
import { useCheckedCategoryStore } from '../model';
import { addSearchListQueryParam } from '../utils';

const ProductListFilterContainer = () => {
  const { updatedValueList, selectedValues, addSelectedValue, removeSelectedValue } = useCheckedCategoryStore();

  const handleGroupCategoryValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.parentNode?.querySelector('label')?.innerText;

    if (value) {
      addSelectedValue(e.target.name, value, e.target.checked);
      addSearchListQueryParam(1, 12, e.target.name, value.toString());
    }
  };

  const handleGiveAwayChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.parentNode?.querySelector('label')?.innerText;

    if (value) {
      addSelectedValue(e.target.name, value, e.target.checked);
      addSearchListQueryParam(1, 12, e.target.name, value.toString());
    }
  };

  const handleRemoveCheckedValue = (e: ChangeEvent<HTMLInputElement>) => {
    // 이벤트 버블링 활용하였음. e.target하면 클릭된 요소가 찍혀서 원하는 텍스트만 가져오기 힘듦.
    removeSelectedValue(e.target.name, e.target.id);
  };

  return (
    <S.FilterContainer>
      <div className='filter-select-container'>
        <CheckboxSelectBox
          categoryList={updatedValueList.region}
          selectBoxCategory='지역별'
          handleChange={handleGroupCategoryValue}
        />
        <CheckboxSelectBox
          categoryList={updatedValueList.species}
          selectBoxCategory='동물별'
          handleChange={handleGroupCategoryValue}
        />
        <CheckboxSelectBox
          categoryList={updatedValueList.product}
          selectBoxCategory='상품별'
          handleChange={handleGroupCategoryValue}
        />
        <BorderCheckBox
          label='free'
          group='isFree'
          value='무료나눔'
          isChecked={updatedValueList.isFree.data[0].isChecked}
          handleChangeCheckBox={handleGiveAwayChecked}
        />
      </div>
      <SelectedCategoryBox handleChange={handleRemoveCheckedValue} selectedValueList={selectedValues} />
    </S.FilterContainer>
  );
};

export { ProductListFilterContainer };
