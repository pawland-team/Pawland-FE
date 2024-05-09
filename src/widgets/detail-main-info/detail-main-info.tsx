import { ProductDetailContent, ProductDetailImages, ProductDetailInfo } from '@entities/product/ui';
import { ProductDetailType } from '@shared/apis/product-api/product-detail.mock';

import * as S from './detail-main-info-style';

interface DetailMainInfoAreaProps {
  detailInfo: ProductDetailType;
}

const DetailMainInfo = ({ detailInfo }: DetailMainInfoAreaProps) => {
  return (
    <>
      <S.MainInfoSection>
        <div className='info-container'>
          <ProductDetailImages SubImagesList={detailInfo.imageUrls} ThumbnailSrc={detailInfo.imageThumbnail} />
          <ProductDetailInfo id={detailInfo.id} detailInfo={detailInfo} />
        </div>
        <S.DivideLine />
        <div className='content-container'>
          <ProductDetailContent detailContent={detailInfo.description} />
        </div>
      </S.MainInfoSection>
    </>
  );
};

export { DetailMainInfo };
