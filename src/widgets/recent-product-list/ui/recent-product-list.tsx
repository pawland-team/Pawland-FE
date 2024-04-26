import { ProductCardItem } from '@entities/product/product-card-item';

import * as S from './recent-product-list-style';

const RecentProductList = () => {
  return (
    <S.ProductListContainer>
      <ProductCardItem />
      <ProductCardItem />
      <ProductCardItem />
      <ProductCardItem />
      <ProductCardItem />
      <ProductCardItem />
      <ProductCardItem />
      <ProductCardItem />
    </S.ProductListContainer>
  );
};

export { RecentProductList };
