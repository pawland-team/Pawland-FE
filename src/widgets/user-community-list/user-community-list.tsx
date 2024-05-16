import { useEffect, useState } from 'react';

import { useGetUserCommunityList } from '@entities/user/hooks/use-get-user-community-list.query';
import { UserCommunityPostItem } from '@entities/user/ui/user-community-post-item';
import { NoProductBox } from '@shared/ui/error';

import * as S from './user-community-list-style';
import { useGetUserCommunityList } from '@entities/user/hooks/use-get-user-community-list.query';
import { NoProductBox } from '@shared/ui/error';
import { useEffect, useState } from 'react';

interface UserCommunityListProps {
  userId: number;
}

export const UserCommunityList = ({ userId }: UserCommunityListProps) => {
  const [page, setPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const initialParams = {
    page: page,
    userId: userId,
  };

  const { data, status } = useGetUserCommunityList(initialParams);

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
      <S.UserCommunityList>
        <h3>'닉네임'님이 작성한 글</h3>
        {data?.content.length === 0 && <NoProductBox message='작성한 글이 없습니다.' />}
        {data.content.map((item) => (
          <UserCommunityPostItem key={item.id} item={item} />
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
      </S.UserCommunityList>
    );
  }
};
