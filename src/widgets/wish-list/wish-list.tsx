import { ProductFlexCardItem } from '@entities/product-card';
import { mainProductInfo } from '@shared/apis/main-list-api/dto';

import * as S from './wish-list-style';

interface WishListProps {
  itemList: mainProductInfo[];
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
