import Head from 'next/head';
import { useRouter } from 'next/router';

import { Loading } from '@app/layout/loading';
import { useGetMainProductList } from '@entities/product/hooks';
import { useGetProductDetail } from '@entities/product/hooks/use-get-product-detail.query';
import { ScrollToButton } from '@shared/ui/buttons';
import { DetailMainInfo } from '@widgets/detail-main-info';
import { ProductListSwiper } from '@widgets/product-list-swiper';

import * as S from './product-detail-page-style';

const ProductDetailPage = () => {
  const router = useRouter();
  const PRODUCT_ID = Number(router.query.id);

  const { data: recentProductListData, isLoading: recentProductLoading } = useGetMainProductList(8);
  const { data: productDetailData, isLoading: productDetailLoading } = useGetProductDetail(PRODUCT_ID);

  if (recentProductLoading || productDetailLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Pawland :: 상품 상세</title>
      </Head>
      <S.ProductDetailPage>
        <S.DetailArticleArea>
          {productDetailData && <DetailMainInfo itemData={productDetailData} />}
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
