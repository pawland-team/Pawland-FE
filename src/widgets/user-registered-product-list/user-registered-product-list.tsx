import { ProductFlexCardItem } from '@entities/product-card';
import { mainProductInfo } from '@shared/apis/main-list-api/dto';

import * as S from './user-registered-product-list-style';

interface UserRegisteredProductListProps {
  itemList: mainProductInfo[];
}

export const UserRegisteredProductList = ({ itemList }: UserRegisteredProductListProps) => {
  return (
    <S.UserRegisteredProductList>
      <S.Title>'닉네임'님의 등록상품</S.Title>
      <S.Line />
      <S.ProductList>
        {itemList.map((item) => (
          <ProductFlexCardItem key={item.id} item={item} flexGap={30} cardNumberPerRow={4} />
        ))}
      </S.ProductList>
    </S.UserRegisteredProductList>
  );
};
