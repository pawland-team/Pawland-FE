import { ProductDetailImages, ProductDetailInfo } from '@entities/product-detail';
import { mainListData } from '@shared/apis/main-list-api/main-list-mock';
import { ScrollToButton } from '@shared/ui/buttons';
import { ProductListSwiper } from '@widgets/product-list-swiper';

import * as S from './product-detail-page-style';

const ProductDetailPage = () => {
  const SubImageArr = [
    '/images/test/test-image1.png',
    '/images/test/test-image2.png',
    '/images/mock/product-card-test-image.png',
    '/images/mock/product-card-test-image.png',
    '/images/mock/product-card-test-image.png',
    '/images/mock/product-card-test-image.png',
  ];

  return (
    <>
      <S.ProductDetailPage>
        <S.ProductDetailArea>
          <S.InfoContainer>
            <ProductDetailImages SubImagesList={SubImageArr} ThumbnailSrc='/images/mock/product-card-test-image.png' />
            <ProductDetailInfo />
          </S.InfoContainer>
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
