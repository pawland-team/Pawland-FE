import Image from 'next/image';
import Link from 'next/link';

import { Loading } from '@app/layout/loading';
import { useGetMainProductList } from '@entities/product/hooks';
import { ProductFlexList } from '@entities/product/ui';

import * as S from './main-product-list-style';

/**
 * 최신순 상품 8개 불러오는 컴포넌트
 */

const MainProductList = () => {
  const { data, isLoading } = useGetMainProductList(8);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <S.ProductListArea>
      {data?.content.length === 0 && (
        <S.NoProductBox>
          <Image src='/images/no-product/no-product.svg' alt='상품 없음' width={178} height={98} />
          <p>아직 등록된 상품이 없습니다.</p>
          <Link href='/'>상품 등록을 해보세요!</Link>
        </S.NoProductBox>
      )}
      {data && data?.content.length > 0 && (
        <>
          <div className='product-title-box'>
            <h3>최신 상품</h3>
            <Link href='/product?page=1&size=12'>더보기</Link>
          </div>
          <ProductFlexList listData={data?.content} />
        </>
      )}
    </S.ProductListArea>
  );
};

export { MainProductList };
