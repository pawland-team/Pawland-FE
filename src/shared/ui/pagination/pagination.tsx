import { usePaginate, usePaginateParams } from '@shared/hooks/use-paginate/usePaginate';
import { useCheckedCategoryStore } from '@widgets/product-list-filter-container/model';

import * as S from './style';

const Pagination = ({ totalCount, itemsPerPage = 8, pagesPerGroup = 5 }: usePaginateParams) => {
  const {
    changePage,
    currentPage,
    currentPageGroup,
    canJumpToPreviousPageGroup,
    jumpToPreviousPageGroup,
    ...usePaginateRest
  } = usePaginate({
    totalCount,
    itemsPerPage,
    pagesPerGroup,
  });

  const { changePagingStatus, pagingStatus } = useCheckedCategoryStore();

  return (
    <S.PaginationContainer>
      <S.ArrowButton type='button' onClick={jumpToPreviousPageGroup} disabled={canJumpToPreviousPageGroup}>
        &lt;
      </S.ArrowButton>
      {currentPageGroup.map((number) => (
        <S.NumberButton
          type='button'
          key={number}
          onClick={(e) => {
            changePage(e.target.innerText);
            changePagingStatus(Number(e.target.innerText), pagingStatus.size, pagingStatus.totalItemCount);
          }}
          className={number === pagingStatus.page ? 'active' : ''}
          // disabled={number === usePaginateRest.totalPages}
        >
          {number}
        </S.NumberButton>
      ))}
      <S.ArrowButton
        type='button'
        onClick={usePaginateRest.jumpToNextPageGroup}
        disabled={usePaginateRest.canJumpToNextPageGroup}
      >
        &gt;
      </S.ArrowButton>
    </S.PaginationContainer>
  );
};

export { Pagination };
