import { ProductFlexCardItem } from '@entities/product/ui';
import { useGetMyWishList } from '@entities/profile/hooks/use-get-my-wish-list.query';
import { NoProductBox } from '@shared/ui/error';

import * as S from './wish-list-style';

export const WishList = () => {
  const { data, status } = useGetMyWishList();

  if (status === 'success') {
    return (
      <S.WishList>
        {data?.length === 0 && <NoProductBox />}
        {data?.map((item) => <ProductFlexCardItem key={item.id} item={item} flexGap={16} cardNumberPerRow={3} />)}
      </S.WishList>
    );
  }
};
