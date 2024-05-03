import { ChangeEvent, MouseEvent } from 'react';

import { BorderCheckBox } from '@shared/ui/checkbox';
import { CheckboxSelectBox } from '@shared/ui/select-box/checkbox-select-box/checkbox-select-box';
import { productCategoryData, regionData, speciesData } from '@widgets/product-category-filter/product-category-data';
import { SelectedFilterManageBox } from '@widgets/selected-filter-manage-box';

import * as S from './product-list-filter-container-style';
import { useCheckedCategoryStore } from '../model';

const ProductListFilterContainer = () => {
  const { selectedValues, addSelectedValue, removeSelectedValue } = useCheckedCategoryStore();

  const handleAddCheckedValue = (e: ChangeEvent<HTMLInputElement>) => {
    // target input의 checked 상태를 클릭할 때 마다 toggle 시킨다.
    addSelectedValue(e.target.id);
  };

  const handleDeleteCheckedValue = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    removeSelectedValue(e.currentTarget.id);
  };

  return (
    <S.FilterContainer>
      <div className='filter-select-container'>
        <CheckboxSelectBox categoryList={regionData} />
        <CheckboxSelectBox categoryList={speciesData} />
        <CheckboxSelectBox categoryList={productCategoryData} />
        <BorderCheckBox label='무료나눔' group='무료나눔' handleChangeCheckBox={handleAddCheckedValue} />
      </div>
      <SelectedFilterManageBox handleClick={handleDeleteCheckedValue} selectedValueList={selectedValues} />
    </S.FilterContainer>
  );
};

export { ProductListFilterContainer };
