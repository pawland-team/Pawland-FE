import Link from 'next/link';

import { ProductFlexList } from '@entities/product-flex-list';
import { useGetMainProductList } from '@entities/product-flex-list/hooks';
import { mainListData } from '@shared/apis/main-list-api/main-list-mock';

import * as S from './main-product-list-style';

const MainProductList = () => {
  const { data } = useGetMainProductList(8);
  console.log(data);

  return (
    <S.ProductListArea>
      <div className='product-title-box'>
        <h3>최신 상품</h3>
        <Link href='/product?page=1&size=12'>더보기</Link>
      </div>
      <ProductFlexList listData={mainListData} />
    </S.ProductListArea>
  );
};

export { MainProductList };
