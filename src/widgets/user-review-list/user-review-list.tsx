import { useEffect, useState } from 'react';

import { useGetUserReviewList } from '@entities/user/hooks/use-get-user-review-list.query';
import { UserReviewItem } from '@entities/user/ui/user-review-item';
import { NoProductBox } from '@shared/ui/error';

import * as S from './user-review-list-style';
import { useGetUserReviewList } from '@entities/user/hooks/use-get-user-review-list.query';
import { NoProductBox } from '@shared/ui/error';
import { useEffect, useState } from 'react';

interface UserReviewListProps {
  userId: number;
}

export const UserReviewList = ({ userId }: UserReviewListProps) => {
  const [page, setPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const initialParams = {
    page: 1,
    size: 3,
    userId: userId,
  };

  const { data, status } = useGetUserReviewList(initialParams);
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
      <S.UserReviewList>
        <h3>'닉네임'님의 리뷰</h3>
        {data?.content.length === 0 && <NoProductBox message='리뷰가 없습니다.' />}
        {data.content.map((item) => (
          <UserReviewItem key={item.reviewId} item={item} />
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
      </S.UserReviewList>
    );
  }
};
