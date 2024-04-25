import { ProductCardItem } from '@entities/product/product-card-item';

import * as S from './product-list-style';

const ProductList = () => {
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

export { ProductList };
