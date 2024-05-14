import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';

// import dynamic from 'next/dynamic';
import Head from 'next/head';

import { getQueryClient } from '@shared/lib/get-query-client';
import { SearchInput } from '@shared/ui/inputs';
import { CommonSelectBox } from '@shared/ui/select-box';
import { productListSortingData } from '@shared/ui/select-box/lib/product-list-sorting-data';
import { ProductListFilterContainer } from '@widgets/product-list-filter-container';
import { useCheckedCategoryStore } from '@widgets/product-list-filter-container/model';
import { SortingValueType } from '@widgets/product-list-filter-container/model/store';
import { ProductSearchResultList } from '@widgets/product-search-result-list';

import * as S from './product-page-style';

// component내부에 비동기 로직이 있다면? loading 처리를 resolve 상태 전까지 해준다.
// resolve 되면, dynamic이 완성된 컴포넌트를 렌더링한다
// const ProductSearchResultList = dynamic(
//   () => import('@widgets/product-search-result-list').then((module) => module.ProductSearchResultList),
//   { ssr: false, suspense: true, loading: () => <Loading /> },
// );

const ProductPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string | undefined>('');
  const { sorting, changeSelectedSortingValue, changeContent, content } = useCheckedCategoryStore();

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleSubmitKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setKeyword(inputRef.current?.value);
  };

  const handleClickSelectList = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const queryClient = getQueryClient();
    const target = e.target as HTMLButtonElement | HTMLDivElement;
    const value = target.innerText as SortingValueType;
    changeSelectedSortingValue(value);
    setIsDropdownOpened(false);
    queryClient.invalidateQueries({ queryKey: ['product'] });
  };

  useEffect(() => {
    if (keyword) {
      changeContent(keyword);
    }
  }, [keyword]);

  return (
    <>
      <Head>
        <title>Pawland :: 상품 목록</title>
      </Head>
      <S.ProductPage>
        <S.SearchArea>
          <SearchInput
            handleSubmit={handleSubmitKeyword}
            inputRef={inputRef}
            maxWidth='940px'
            placeholder='원하시는 상품을 검색해보세요!'
            content={content}
          />
          <S.SearchSortingContainer>
            {content !== '' && (
              <h2>
                <strong>{`‘${content}‘`}</strong>에 대한 검색결과입니다.
              </h2>
            )}
          </S.SearchSortingContainer>
        </S.SearchArea>
        <S.filterArea>
          <ProductListFilterContainer />
        </S.filterArea>
        <S.SelectBoxArea>
          <CommonSelectBox
            selectedName={sorting}
            dropdownList={productListSortingData}
            handleClickSelectList={handleClickSelectList}
            setIsOpened={setIsDropdownOpened}
            isOpened={isDropdownOpened}
          />
        </S.SelectBoxArea>
        <S.CardListArea>
          <ProductSearchResultList />
        </S.CardListArea>
      </S.ProductPage>
    </>
  );
};

export { ProductPage };
