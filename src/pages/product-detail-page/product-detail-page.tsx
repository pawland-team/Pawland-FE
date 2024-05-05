import { ProductDetailInfo } from '@entities/product-detail';
import { mainListData } from '@shared/apis/main-list-api/main-list-mock';
import { ScrollToButton } from '@shared/ui/buttons';
import { ProductListSwiper } from '@widgets/product-list-swiper';

import * as S from './product-detail-page-style';

const ProductDetailPage = () => {
  return (
    <>
      <S.ProductDetailPage>
        <S.ProductDetailArea>
          <ProductDetailInfo />
        </S.ProductDetailArea>
        <S.RecentProductArea>
          <ProductListSwiper productList={mainListData} />
        </S.RecentProductArea>
      </S.ProductDetailPage>
      <ScrollToButton />
    </>
  );
};

export { ProductDetailPage };