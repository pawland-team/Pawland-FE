import Link from 'next/link';

import { ProductList } from '@widgets/product-list';

import * as S from './main-product-list-style';

const MainProductList = () => {
  return (
    <S.ProductListArea>
      <div className='product-title-box'>
        <h3>최신 상품</h3>
        <Link href='/product'>더보기</Link>
      </div>
      <ProductList />
    </S.ProductListArea>
  );
};

export { MainProductList };
