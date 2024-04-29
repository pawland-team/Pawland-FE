import { FormEvent, useRef, useState } from 'react';

import { CommonCheckBox } from '@shared/ui/checkbox';
import { SearchInput } from '@shared/ui/inputs';

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
      <S.SearchInputArea>
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
          <CommonCheckBox label='대구' checked group='region' />
          <CommonCheckBox label='서울' group='region' />
        </S.SearchSortingContainer>
      </S.SearchInputArea>
      <S.CardListArea>
        <CardListWithSortingBox />
      </S.CardListArea>
    </S.ProductPage>
  );
};

export { ProductPage };
