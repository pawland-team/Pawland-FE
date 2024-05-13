import { ChangeEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

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

const initialSearchParam = {
  region: [],
  species: [],
  category: [],
};

const ProductListFilterContainer = () => {
  const router = useRouter();

  const [selectedSearchParams, setSelectedSearchParams] = useState<selectedSearchParamsType>(initialSearchParam);

  const {
    updatedValueList,
    selectedValues,
    addSelectedValue,
    removeSelectedValue,
    searchParams,
    clearSelectedValues,
    changeIsFree,
    isFree,
    sorting,
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
    }
  };

  const handleGiveAwayChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.parentNode?.querySelector('label')?.innerText;

    if (value) {
      changeIsFree(!isFree);
    }
  };

  const handleRemoveCheckedValue = (e: ChangeEvent<HTMLInputElement>) => {
    // 이벤트 버블링 활용하였음. e.target하면 클릭된 요소가 찍혀서 원하는 텍스트만 가져오기 힘듦.
    removeSelectedValue(e.target.name, e.target.id);
  };

  const handleClearSelectedValue = () => {
    clearSelectedValues();
    setSelectedSearchParams(initialSearchParam);
  };

  useEffect(() => {
    router.push(
      `/product?page=1&size=12&region=${searchParams.region}&species=${searchParams.species}&category=${searchParams.category}&isFree=${isFree}&orderBy=${sorting}`,
    );
  }, [searchParams, sorting, isFree]);

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
