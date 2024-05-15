import { useGetUserProductList } from '@entities/user/hooks/use-get-user-product-list.query';
import * as S from './user-registered-product-list-style';
import { NoProductBox } from '@shared/ui/error';
import { ProductListSwiper } from '@widgets/product-list-swiper';

interface UserRegisteredProductListProps {
  userId: number;
}

export const UserRegisteredProductList = ({ userId }: UserRegisteredProductListProps) => {
  const initialParams = {
    size: 8,
    userId: userId,
  };

  const { data, status } = useGetUserProductList(initialParams);

  if (status === 'success') {
    return (
      <S.UserRegisteredProductList>
        <h3>'닉네임'님의 등록상품</h3>
        {data?.content.length === 0 && <NoProductBox />}
        {data?.content && <ProductListSwiper productList={data?.content} />}
      </S.UserRegisteredProductList>
    );
  }
};
