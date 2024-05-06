import { ProductDetailImages, ProductDetailInfo } from '@entities/product-detail';
import { ProductDetailType } from '@shared/apis/product-api/product-detail.mock';

import * as S from './detail-main-info-style';

interface DetailMainInfoAreaProps {
  detailInfo: ProductDetailType;
}

const DetailMainInfo = ({ detailInfo }: DetailMainInfoAreaProps) => {
  return (
    <>
      <S.MainInfoSection>
        <ProductDetailImages SubImagesList={detailInfo.imageUrls} ThumbnailSrc={detailInfo.imageThumbnail} />
        <ProductDetailInfo detailInfo={detailInfo} />
      </S.MainInfoSection>
    </>
  );
};

export { DetailMainInfo };
