import { FormEvent, useRef, useState } from 'react';

import { SearchInput } from '@shared/ui/inputs';
import { CommonSelectBox } from '@shared/ui/select-box';
import { productListSortingData } from '@shared/ui/select-box/lib/product-list-sorting-data';
import { ProductCategoryFilterBox } from '@widgets/product-category-filter';
import { mainCategoryData } from '@widgets/product-category-filter/product-category-data';

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
      <S.SortingArea>
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
          <ProductCategoryFilterBox list={mainCategoryData} />
        </S.SearchSortingContainer>
      </S.SortingArea>
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
