import { mainListData } from '@shared/apis/main-list-api/main-list-mock';
import { ScrollToButton } from '@shared/ui/buttons';
import { DetailMainInfo } from '@widgets/detail-main-info';
import { ProductListSwiper } from '@widgets/product-list-swiper';

import * as S from './product-detail-page-style';

const ProductDetailPage = () => {
  const subImageArr = [
    '/images/test/test-image1.png',
    '/images/test/test-image2.png',
    '/images/mock/product-card-test-image.png',
  ];

  return (
    <>
      <S.ProductDetailPage>
        <S.DetailArticleArea>
          <DetailMainInfo SubImagesList={subImageArr} />
          <S.DivideLine />
        </S.DetailArticleArea>
        <S.RecentProductArea>
          <ProductListSwiper productList={mainListData} />
        </S.RecentProductArea>
      </S.ProductDetailPage>
      <ScrollToButton />
    </>
  );
};

export { ProductDetailPage };
