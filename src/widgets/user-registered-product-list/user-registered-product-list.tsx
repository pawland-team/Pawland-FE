import { useGetUserProductList } from '@entities/user/hooks/use-get-user-product-list.query';
import * as S from './user-registered-product-list-style';
import { NoProductBox } from '@shared/ui/error';
import { ProductListSwiper } from '@widgets/product-list-swiper';
import { getUserProductListParams } from '@shared/apis/user-api/dto';
// import { mainListData } from '@shared/apis/main-list-api/main-list-mock';

interface UserRegisteredProductListProps {
  userId: number;
}

export const UserRegisteredProductList = ({ userId }: UserRegisteredProductListProps) => {
  const initialParams = {
    page: 1,
    size: 4,
    userId: userId,
  };

  const { data, status } = useGetUserProductList(initialParams);

  if (status === 'success') {
    return (
      <S.UserRegisteredProductList>
        <h3>'닉네임'님의 등록상품</h3>
        {data?.length === 0 && <NoProductBox />}
        {/* {data && <ProductListSwiper productList={data} />} */}
      </S.UserRegisteredProductList>
    );
  }
};
