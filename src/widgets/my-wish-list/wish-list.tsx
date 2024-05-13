import { ProductFlexCardItem } from '@entities/product/ui';

import * as S from './wish-list-style';
import { useGetMyWishList } from '@entities/profile/hooks/use-get-my-wish-list.query';

export const WishList = () => {
  const { data, status } = useGetMyWishList();
  if (status === 'success') {
    return (
      <S.WishList>
        {data?.map((item) => <ProductFlexCardItem key={item.id} item={item} flexGap={16} cardNumberPerRow={3} />)}
      </S.WishList>
    );
  }
};
