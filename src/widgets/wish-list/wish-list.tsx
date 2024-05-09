import { ProductFlexCardItem } from '@entities/product/ui';
import { ProductListItemDto } from '@shared/apis/product-api';

import * as S from './wish-list-style';

interface WishListProps {
  itemList: ProductListItemDto[];
}

export const WishList = ({ itemList }: WishListProps) => {
  return (
    <S.WishList>
      {itemList.map((item) => (
        <ProductFlexCardItem key={item.id} item={item} flexGap={16} cardNumberPerRow={3} />
      ))}
    </S.WishList>
  );
};
