import { FormEvent, useRef, useState } from 'react';

import { SelectedFilterManageBox } from '@features/selected-filter-manage-box';
import { BorderCheckBox } from '@shared/ui/checkbox';
import { SearchInput } from '@shared/ui/inputs';
import { CommonSelectBox } from '@shared/ui/select-box';
import { CheckboxSelectBox } from '@shared/ui/select-box/checkbox-select-box/checkbox-select-box';
import { productListSortingData } from '@shared/ui/select-box/lib/product-list-sorting-data';
import { productCategoryData, regionData, speciesData } from '@widgets/product-category-filter/product-category-data';

import * as S from './product-page-style';
import { CardListWithSortingBox } from './ui/card-list-with-sorting-box';

const ProductPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string | undefined>('');
  const [selectedSortingName, setSelectedSortingName] = useState<string | undefined>('최신순');

  const handleSubmitKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setKeyword(inputRef.current?.value);
  };

  return (
    <S.ProductPage>
      <S.SearchArea>
        <SearchInput
          handleSubmit={handleSubmitKeyword}
          inputRef={inputRef}
          maxWidth='940px'
          placeholder='원하시는 상품을 검색해보세요!'
        />
        <S.SearchSortingContainer>
          {keyword !== '' && (
            <h2>
              <strong>{`‘${keyword}‘`}</strong>에 대한 검색결과입니다.
            </h2>
          )}
        </S.SearchSortingContainer>
      </S.SearchArea>
      <S.filterArea>
        <div className='filter-select-container'>
          <CheckboxSelectBox categoryList={regionData} />
          <CheckboxSelectBox categoryList={speciesData} />
          <CheckboxSelectBox categoryList={productCategoryData} />
          <BorderCheckBox label='무료나눔' group='무료나눔' />
        </div>
        <SelectedFilterManageBox selectedValueList={['서울', '악세서리', '무료나눔']} />
      </S.filterArea>
      <S.SelectBoxArea>
        <CommonSelectBox
          selectedName={selectedSortingName}
          dropdownList={productListSortingData}
          setSelectedSortingName={setSelectedSortingName}
        />
      </S.SelectBoxArea>
      <S.CardListArea>
        <CardListWithSortingBox />
      </S.CardListArea>
    </S.ProductPage>
  );
};

export { ProductPage };
