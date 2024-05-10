import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { useGetProductDetail } from '@entities/product/hooks/use-get-product-detail.query';
import { ProductDetailContent, ProductDetailImages, ProductDetailInfo } from '@entities/product/ui';

import * as S from './detail-main-info-style';

const DetailMainInfo = () => {
  const router = useRouter();
  const PRODUCT_ID = Number(router.query.id);
  const { data: productDetailData } = useGetProductDetail(PRODUCT_ID);

  // TODO: error 처리 필요할듯
  if (!productDetailData) {
    router.push('/product');

    return toast.error('상품 데이터가 존재하지 않습니다. 다시 시도해 주세요.');
  }

  return (
    <>
      <S.MainInfoSection>
        <div className='info-container'>
          <ProductDetailImages
            SubImagesList={productDetailData.imageUrls}
            ThumbnailSrc={
              productDetailData.thumbnailImage === undefined
                ? '/images/product/default-card-thumbnail.png'
                : productDetailData.thumbnailImage
            }
          />
          <ProductDetailInfo id={productDetailData.id} detailInfo={productDetailData} />
        </div>
        <S.DivideLine />
        <div className='content-container'>
          <ProductDetailContent detailContent={productDetailData.content} />
        </div>
      </S.MainInfoSection>
    </>
  );
};

export { DetailMainInfo };
