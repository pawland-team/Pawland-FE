import { useGetmyProductList } from '@entities/profile/hooks/use-get-my-product-list.query';
import { RegisteredProductItem } from '@entities/profile/ui';
import { DropdownButton } from '@shared/ui/buttons';
import { NoProductBox } from '@shared/ui/error';

import * as S from './my-registered-product-list-style';
import { useEffect, useState } from 'react';

export const MyRegisteredProductList = () => {
  const [page, setPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const initialParams = {
    page: page,
    size: 4,
    type: '',
  };

  const { data, status } = useGetmyProductList(initialParams);

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
      <S.RegisteredProductList>
        <div className='button-area'>
          <DropdownButton
            dropdownItems={['전체보기', '판매중']}
            lastDropdownItem={'판매완료'}
            defaultMenu={'전체보기'}
            iconPath={'images/icon/arrow-down-icon-gray.svg'}
          />
        </div>
        {data?.content.length === 0 && <NoProductBox />}

        {data.content.map((item) => (
          <RegisteredProductItem key={item.id} item={item} />
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
      </S.RegisteredProductList>
    );
  }
};
