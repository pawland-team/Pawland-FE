import { ChangeEvent, MouseEvent } from 'react';

import { BorderCheckBox } from '@shared/ui/checkbox';
import { CheckboxSelectBox } from '@shared/ui/select-box/checkbox-select-box/checkbox-select-box';
import { SelectedFilterManageBox } from '@widgets/selected-filter-manage-box';

import * as S from './product-list-filter-container-style';
import { useCheckedCategoryStore } from '../model';

const ProductListFilterContainer = () => {
  const { initialValueList, selectedValues, giveAway, addGiveAwayValue, addSelectedValue, removeSelectedValue } =
    useCheckedCategoryStore();

  const handleGroupCategoryValue = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    // console.log(e.target.name);
    addSelectedValue(e.target.name, e.target.id, e.target.checked);
  };

  const handleGiveAwayChecked = (e: ChangeEvent<HTMLInputElement>) => {
    addGiveAwayValue('무료나눔', e.target.id, e.target.checked);
    // addSelectedValue(e.target.id, e.target.checked, e.target.name);
  };

  const handleRemoveCheckedValue = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    // 이벤트 버블링 활용하였음. e.target하면 클릭된 요소가 찍혀서 원하는 텍스트만 가져오기 힘듦.
    console.log(e.currentTarget.id);
    removeSelectedValue(e.currentTarget.id);
  };

  return (
    <S.FilterContainer>
      <div className='filter-select-container'>
        <CheckboxSelectBox categoryList={initialValueList.region} handleChange={handleGroupCategoryValue} />
        <CheckboxSelectBox categoryList={initialValueList.species} handleChange={handleGroupCategoryValue} />
        <CheckboxSelectBox categoryList={initialValueList.product} handleChange={handleGroupCategoryValue} />
        <BorderCheckBox
          label='무료나눔'
          group='무료나눔'
          isChecked={giveAway.isChecked}
          handleChangeCheckBox={handleGiveAwayChecked}
        />
      </div>
      <SelectedFilterManageBox handleClick={handleRemoveCheckedValue} selectedValueList={selectedValues} />
    </S.FilterContainer>
  );
};

export { ProductListFilterContainer };
