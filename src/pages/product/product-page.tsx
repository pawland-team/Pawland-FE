import { FormEvent, useRef, useState } from 'react';

import { mainCategory } from '@shared/constants/main-category';
import { SearchInput } from '@shared/ui/inputs';
import { ProductCategoryFilterBox } from '@widgets/product-category-filter';

import * as S from './product-page-style';
import { CardListWithSortingBox } from './ui/card-list-with-sorting-box';

const ProductPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');

  const handleSubmitKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setKeyword(inputRef?.current?.value);
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
          <ProductCategoryFilterBox list={mainCategory} />
        </S.SearchSortingContainer>
      </S.SortingArea>
      <S.CardListArea>
        <CardListWithSortingBox />
      </S.CardListArea>
    </S.ProductPage>
  );
};

export { ProductPage };
