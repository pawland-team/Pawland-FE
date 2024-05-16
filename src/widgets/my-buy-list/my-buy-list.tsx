import { useEffect, useState } from 'react';

import { useGetmyTransactionList } from '@entities/profile/hooks/use-get-my-transaction-list.query';
import { ReviewItem, TransactionItem } from '@entities/profile/ui';
import { NoProductBox } from '@shared/ui/error';
import { ReviewWritingArea } from '@widgets/profile-page-review-writing-area';

import * as S from './my-buy-list-style';

export const MyBuyList = () => {
  const [page, setPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const initialParams = {
    page: 1,
    size: 4,
    type: '구매내역',
  };

  const { data, status } = useGetmyTransactionList(initialParams);

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
      <S.TransactionHistoryList>
        {data?.content.length === 0 && <NoProductBox message='구매한 상품이 없습니다.' />}

        {data.content.map((item) => (
          <TransactionItem
            reviewArea={
              item.orderReviewResponse ? (
                <ReviewItem reviewData={item.orderReviewResponse} buyer={item.buyer} />
              ) : (
                <ReviewWritingArea orderId={item.id} />
              )
            }
            key={item.id}
            item={item}
            itemTitle={'구매상품'}
          />
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
      </S.TransactionHistoryList>
    );
  }
};
