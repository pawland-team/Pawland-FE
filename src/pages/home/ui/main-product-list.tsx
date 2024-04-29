import Link from 'next/link';

import { ProductList } from '@widgets/recent-product-list';

import * as S from '../home-page-style';

const MainProductList = () => {
  return (
    <S.ProductListArea>
      <div className='product-title-box'>
        <h3>최신 상품</h3>
        <Link href='/'>더보기</Link>
      </div>
      <ProductList />
    </S.ProductListArea>
  );
};

export { MainProductList };
