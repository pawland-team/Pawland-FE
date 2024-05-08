import { useGetMainProductList } from '@entities/product/hooks';
import { mockProductDetailInfo } from '@shared/apis/product-api';
import { ScrollToButton } from '@shared/ui/buttons';
import { DetailMainInfo } from '@widgets/detail-main-info';
import { ProductListSwiper } from '@widgets/product-list-swiper';

import * as S from './product-detail-page-style';

const ProductDetailPage = () => {
  const { data: recentProductListData } = useGetMainProductList(8);

  return (
    <>
      <S.ProductDetailPage>
        <S.DetailArticleArea>
          <DetailMainInfo detailInfo={mockProductDetailInfo} />
        </S.DetailArticleArea>
        {recentProductListData && (
          <S.RecentProductArea>
            <h3>최신상품</h3>
            <ProductListSwiper productList={recentProductListData?.content} />
          </S.RecentProductArea>
        )}
      </S.ProductDetailPage>
      <ScrollToButton />
    </>
  );
};

export { ProductDetailPage };
