import { useEffect, useState } from 'react';

import { ProductFlexCardItem } from '@entities/product/ui';
import { useGetMyWishList } from '@entities/profile/hooks/use-get-my-wish-list.query';
import { NoProductBox } from '@shared/ui/error';

import * as S from './wish-list-style';

export const WishList = () => {
  const [page, setPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const initialParams = {
    page: 1,
  };
  const { data, status } = useGetMyWishList(initialParams);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    const visiblePages = 5;
    let startPage = page - 2;

    if (startPage < 1) {
      startPage = 1;
    }

    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const newPageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      newPageNumbers.push(i);
    }

    setPageNumbers(newPageNumbers);
  }, [page, totalPages]);

  if (status === 'success') {
    return (
      <S.WishList>
        {data?.content.length === 0 && <NoProductBox message='찜한 상품이 없습니다.' />}
        {data?.content.map((item) => (
          <ProductFlexCardItem key={item.id} item={item} flexGap={16} cardNumberPerRow={3} />
        ))}
        <S.PaginationWrapper>
          <button type='button' onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            &lt;
          </button>
          {pageNumbers.map((number) => (
            <button type='button' key={number} onClick={() => handlePageChange(number)} disabled={number === page}>
              {number}
            </button>
          ))}
          <button type='button' onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            &gt;
          </button>
        </S.PaginationWrapper>
      </S.WishList>
    );
  }
};
