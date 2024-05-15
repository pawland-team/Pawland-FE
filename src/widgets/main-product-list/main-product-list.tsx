import Link from 'next/link';

import { useGetMainProductList } from '@entities/product/hooks';
import { ProductFlexList } from '@entities/product/ui';
import { NoProductBox } from '@shared/ui/error';

import * as S from './main-product-list-style';

/**
 * 최신순 상품 8개 불러오는 컴포넌트
 */

const MainProductList = () => {
  const { data } = useGetMainProductList(8);

  if (!data || data?.content.length === 0) {
    return <NoProductBox />;
  }

  return (
    <S.ProductListArea>
      {data && (
        <>
          <div className='product-title-box'>
            <h3>최신 상품</h3>
            <Link href='/product'>더보기</Link>
          </div>
          <ProductFlexList listData={data?.content} />
        </>
      )}
    </S.ProductListArea>
  );
};

export { MainProductList };
