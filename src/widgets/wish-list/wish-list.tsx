import * as S from './wish-list-style';
import { ProductCardItem } from '../../entities/product/product-card-item/index';

export const WishList = () => {
  return (
    <S.WishList>
      <ProductCardItem flexGap={16} cardNumberPerRow={3} />
      <ProductCardItem flexGap={16} cardNumberPerRow={3} />
      <ProductCardItem flexGap={16} cardNumberPerRow={3} />
      <ProductCardItem flexGap={16} cardNumberPerRow={3} />
      <ProductCardItem flexGap={16} cardNumberPerRow={3} />
      <ProductCardItem flexGap={16} cardNumberPerRow={3} />
      <ProductCardItem flexGap={16} cardNumberPerRow={3} />
      <ProductCardItem flexGap={16} cardNumberPerRow={3} />
      <ProductCardItem flexGap={16} cardNumberPerRow={3} />
    </S.WishList>
  );
};
