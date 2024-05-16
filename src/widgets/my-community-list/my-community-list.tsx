import { useEffect, useState } from 'react';

import { orderBy } from 'lodash';

import { useGetmyCommunityList } from '@entities/profile/hooks';
import { CommunityPostItem } from '@entities/profile/ui/my-community-post-item';
import { MyCommunityPostEntity } from '@shared/apis/profile-api';
import { DropdownButton } from '@shared/ui/buttons';
import { NoProductBox } from '@shared/ui/error';
// import { TapMenuBar } from '@widgets/profile-page-tap-menu-bar';

import * as S from './my-community-list-style';

export const MyCommunityList = () => {
  const [page, setPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const initialParams = {
    page,
    oderBy: orderBy,
  };
  const { data, status } = useGetmyCommunityList(initialParams);
  console.log(data);

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
    const listData: MyCommunityPostEntity[] = data?.content;

    return (
      <S.CommunityList>
        <div className='button-area'>
          {/* <TapMenuBar /> */}
          <DropdownButton
            dropdownItems={['전체보기', '최신순']}
            lastDropdownItem={'인기순'}
            defaultMenu={'전체보기'}
            iconPath={'images/icon/arrow-down-icon-gray.svg'}
          />
        </div>
        {data?.content.length === 0 && <NoProductBox message='작성한 글이 없습니다.' />}

        {listData.map((item) => (
          <CommunityPostItem key={item.id} item={item} />
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
      </S.CommunityList>
    );
  }
};
