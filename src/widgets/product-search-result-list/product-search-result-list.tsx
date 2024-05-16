import { useEffect } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { useGetSearchResultList } from '@entities/product/hooks/use-get-search-result-list.query';
import { ProductFlexList } from '@entities/product/ui';
import { SearchListParam } from '@shared/apis/product-api/get-product-search-list-api';
import { NoProductBox } from '@shared/ui/error';
import { Pagination } from '@shared/ui/pagination';
import { useCheckedCategoryStore } from '@widgets/product-list-filter-container/model';

import * as S from './style';

/**
 * 상품 리스트 (검색 결과) + 페이지네이션 같이 있는 컴포넌트
 */

const ProductSearchResultList = () => {
  const { searchParams, isFree, sorting, content, pagingStatus, changePagingStatus } = useCheckedCategoryStore(
    useShallow(({ searchParams, isFree, sorting, content, pagingStatus, changePagingStatus }) => ({
      searchParams,
      isFree,
      sorting,
      content,
      pagingStatus,
      changePagingStatus,
    })),
  );

  const newSearchParams: SearchListParam = {
    page: pagingStatus.page,
    size: pagingStatus.size,
    region: String(searchParams.region),
    species: String(searchParams.species),
    category: String(searchParams.category),
    isFree: String(isFree),
    orderBy: String(sorting),
    content: String(content),
  };

  const { data } = useGetSearchResultList(newSearchParams);
  const totalCardCount = data?.totalElements;

  // console.log(`isFetching: ${isFetching}`);
  // console.log(`isLoading: ${isLoading}`);

  useEffect(() => {
    if (totalCardCount !== undefined && totalCardCount >= 0) {
      return changePagingStatus(pagingStatus.page, pagingStatus.size, totalCardCount);
    }
  }, [totalCardCount]);

  // ? : 상품 결과 없을 때 그냥 빈 배열 보내주면 안되는건지?
  // if (isLoading) {
  //   return <Loading />;
  // }

  if (data) {
    if (data.content.length > 0) {
      return (
        <>
          <S.SearchResultArea>
            <ProductFlexList listData={data.content} />
            {totalCardCount && pagingStatus.totalItemCount > pagingStatus.size && (
              <div className='pagination-container'>
                <Pagination totalCount={totalCardCount} itemsPerPage={12} initialPageOnMount={pagingStatus.page} />
              </div>
            )}
          </S.SearchResultArea>
        </>
      );
    }
  }

  return <NoProductBox message='등록한 상품이 없습니다.' />;
};

export { ProductSearchResultList };
