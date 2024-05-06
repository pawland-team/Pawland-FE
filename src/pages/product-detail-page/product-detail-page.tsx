import { useRouter } from 'next/router';

import { useGetProductDetail } from '@entities/product-detail/hooks';
import { mainListData } from '@shared/apis/main-list-api/main-list-mock';
import { mockProductDetailInfo } from '@shared/apis/product-api';
import { ScrollToButton } from '@shared/ui/buttons';
import { DetailMainInfo } from '@widgets/detail-main-info';
import { ProductListSwiper } from '@widgets/product-list-swiper';

import * as S from './product-detail-page-style';

const ProductDetailPage = () => {
  const router = useRouter();
  const PRODUCT_ID = Number(router.query.id);
  const { data, status } = useGetProductDetail(PRODUCT_ID);

  console.log(data, status);

  return (
    <>
      <S.ProductDetailPage>
        <S.DetailArticleArea>
          <DetailMainInfo detailInfo={mockProductDetailInfo} />
        </S.DetailArticleArea>
        <S.RecentProductArea>
          <h3>최신상품</h3>
          <ProductListSwiper productList={mainListData} />
        </S.RecentProductArea>
      </S.ProductDetailPage>
      <ScrollToButton />
    </>
  );
};

export { ProductDetailPage };
