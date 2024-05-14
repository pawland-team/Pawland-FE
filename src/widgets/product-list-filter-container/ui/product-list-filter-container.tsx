import { ChangeEvent, useState } from 'react';

import { getQueryClient } from '@shared/lib/get-query-client';
import { BorderCheckBox } from '@shared/ui/checkbox';
import { CheckboxSelectBox } from '@shared/ui/select-box/checkbox-select-box/checkbox-select-box';
import { SelectedCategoryBox } from '@widgets/product-selected-category-box';

import * as S from './product-list-filter-container-style';
import { useCheckedCategoryStore } from '../model';

interface selectedSearchParamsType {
  region: string[];
  species: string[];
  category: string[];
}

const ProductListFilterContainer = () => {
  const queryClient = getQueryClient();

  const initialSearchParam = {
    region: [],
    species: [],
    category: [],
  };

  // const initialIsFree = false;
  // const initialSortingValue = '최신순';

  const [selectedSearchParams, setSelectedSearchParams] = useState<selectedSearchParamsType>(initialSearchParam);
  // const [isFreeChecked, setIsFreeChecked] = useState(initialIsFree);
  // const [sortingValue, setSortingValue] = useState(initialSortingValue);

  const {
    updatedValueList,
    selectedValues,
    addSelectedValue,
    removeSelectedValue,
    clearSelectedValues,
    changeIsFree,
    isFree,
    changePagingStatus,
    pagingStatus,
  } = useCheckedCategoryStore();

  const handleGroupCategoryValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.parentNode?.querySelector('label')?.innerText;

    if (value) {
      // zustand로 관리중인데 나중에 지워야할수도...
      addSelectedValue(e.target.name, value, e.target.checked);

      // 검색 params로 넘겨줘야하는 값을 저장한다.
      setSelectedSearchParams({
        ...selectedSearchParams,
        [e.target.name]: [...selectedSearchParams[e.target.name as keyof selectedSearchParamsType], value],
      });
      queryClient.invalidateQueries({ queryKey: ['product'] });
      changePagingStatus(1, 12, pagingStatus.totalItemCount);
    }
  };

  const handleGiveAwayChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.parentNode?.querySelector('label')?.innerText;

    if (value) {
      changeIsFree(!isFree);
    }

    changePagingStatus(1, 12, pagingStatus.totalItemCount);
  };

  const handleRemoveCheckedValue = (e: ChangeEvent<HTMLInputElement>) => {
    // 이벤트 버블링 활용하였음. e.target하면 클릭된 요소가 찍혀서 원하는 텍스트만 가져오기 힘듦.
    removeSelectedValue(e.target.name, e.target.id);
    queryClient.invalidateQueries({ queryKey: ['product'] });
    changePagingStatus(1, 12, pagingStatus.totalItemCount);
  };

  const handleClearSelectedValue = () => {
    clearSelectedValues();
    setSelectedSearchParams(initialSearchParam);
    queryClient.invalidateQueries({ queryKey: ['product'] });
    changePagingStatus(1, 12, pagingStatus.totalItemCount);
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
          categoryList={updatedValueList.category}
          selectBoxCategory='상품별'
          handleChange={handleGroupCategoryValue}
        />
        <BorderCheckBox
          label='free'
          group='isFree'
          value='무료나눔'
          isChecked={isFree}
          handleChangeCheckBox={handleGiveAwayChecked}
        />
      </div>
      <SelectedCategoryBox
        handleClear={handleClearSelectedValue}
        handleChange={handleRemoveCheckedValue}
        selectedValueList={selectedValues}
      />
    </S.FilterContainer>
  );
};

export { ProductListFilterContainer };
