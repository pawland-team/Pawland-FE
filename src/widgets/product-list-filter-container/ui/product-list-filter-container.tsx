import { ChangeEvent } from 'react';

import { BorderCheckBox } from '@shared/ui/checkbox';
import { CheckboxSelectBox } from '@shared/ui/select-box/checkbox-select-box/checkbox-select-box';
import { SelectedFilterManageBox } from '@widgets/selected-filter-manage-box';

import * as S from './product-list-filter-container-style';
import { useCheckedCategoryStore } from '../model';

const ProductListFilterContainer = () => {
  const { updatedValueList, selectedValues, addSelectedValue, removeSelectedValue } = useCheckedCategoryStore();

  const handleGroupCategoryValue = (e: ChangeEvent<HTMLInputElement>) => {
    addSelectedValue(e.target.name, e.target.id, e.target.checked);
  };

  const handleGiveAwayChecked = (e: ChangeEvent<HTMLInputElement>) => {
    addSelectedValue('giveAway', e.target.id, e.target.checked);
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
          label='무료나눔'
          group='무료나눔'
          isChecked={updatedValueList.giveAway.data[0].isChecked}
          handleChangeCheckBox={handleGiveAwayChecked}
        />
      </div>
      <SelectedFilterManageBox handleChange={handleRemoveCheckedValue} selectedValueList={selectedValues} />
    </S.FilterContainer>
  );
};

export { ProductListFilterContainer };
