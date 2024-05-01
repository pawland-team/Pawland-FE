import Link from 'next/link';

import { mainListData } from '@shared/apis/main-list-api/main-list-mock';
import { ProductFlexList } from '@widgets/product-flex-list';

import * as S from './main-product-list-style';

const MainProductList = () => {
  return (
    <S.ProductListArea>
      <div className='product-title-box'>
        <h3>최신 상품</h3>
        <Link href='/product'>더보기</Link>
      </div>
      <ProductFlexList listData={mainListData} />
    </S.ProductListArea>
  );
};

export { MainProductList };
