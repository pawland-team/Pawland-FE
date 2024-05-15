import React, { MouseEventHandler } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { usePaginate, usePaginateParams } from '@shared/hooks/use-paginate/usePaginate';
import { useCheckedCategoryStore } from '@widgets/product-list-filter-container/model';

import * as S from './style';

// 이 컴포넌트가 리렌더리 되면서
// usePaginate의 내부에서 state를 다시 초기화하고 있ㅓㅇ
const Pagination = ({ totalCount, itemsPerPage = 12, pagesPerGroup = 5, initialPageOnMount }: usePaginateParams) => {
  const {
    changePage,
    currentPage,
    currentPageGroup,
    canJumpToPreviousPageGroup,
    jumpToPreviousPageGroup,
    jumpToNextPageGroup,
    canJumpToNextPageGroup,
  } = usePaginate({
    totalCount,
    itemsPerPage,
    pagesPerGroup,
    initialPageOnMount,
  });

  const { changePagingStatus, pagingStatus } = useCheckedCategoryStore(
    useShallow(({ changePagingStatus, pagingStatus }) => ({ changePagingStatus, pagingStatus })),
  );

  // changePage
  // zustand 동시에 비동기적으로 되고 있었음.
  const handleClickToChangePage: MouseEventHandler<HTMLButtonElement> = (e) => {
    const targetValue = e.currentTarget;
    changePage(Number(targetValue.innerText));
    changePagingStatus(Number(targetValue.innerText), pagingStatus.size, pagingStatus.totalItemCount);
  };

  return (
    <S.PaginationContainer>
      {canJumpToPreviousPageGroup && (
        <S.ArrowButton type='button' onClick={jumpToPreviousPageGroup}>
          &lt;
        </S.ArrowButton>
      )}
      {currentPageGroup.map((number) => (
        <>
          {console.log(currentPage)}
          <S.NumberButton
            type='button'
            key={number}
            onClick={handleClickToChangePage}
            className={number === currentPage ? 'active' : ''}
            // disabled={number === usePaginateRest.totalPages}
          >
            {number}
          </S.NumberButton>
        </>
      ))}
      {canJumpToNextPageGroup && (
        <S.ArrowButton type='button' onClick={jumpToNextPageGroup}>
          &gt;
        </S.ArrowButton>
      )}
    </S.PaginationContainer>
  );
};

export { Pagination };
