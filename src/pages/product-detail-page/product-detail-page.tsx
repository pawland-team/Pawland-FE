import { mainListData } from '@shared/apis/main-list-api/main-list-mock';
import { ScrollToTopButton } from '@shared/ui/buttons';
import { ProductListSwiper } from '@widgets/product-list-swiper';

import * as S from './product-detail-page-style';

const ProductDetailPage = () => {
  return (
    <>
      <S.ProductDetailPage>
        <S.ProductDetailArea>detail</S.ProductDetailArea>
        <S.RecentProductArea>
          <ProductListSwiper productList={mainListData} />
        </S.RecentProductArea>
      </S.ProductDetailPage>
      <ScrollToTopButton />
    </>
  );
};

export { ProductDetailPage };
