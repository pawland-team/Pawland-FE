import { ProductDetailImages, ProductDetailInfo } from '@entities/product-detail';

import * as S from './detail-main-info-style';

interface DetailMainInfoAreaProps {
  SubImagesList: string[];
}

const DetailMainInfo = ({ SubImagesList }: DetailMainInfoAreaProps) => {
  return (
    <>
      <S.MainInfoSection>
        <ProductDetailImages SubImagesList={SubImagesList} ThumbnailSrc='/images/mock/product-card-test-image.png' />
        <ProductDetailInfo />
      </S.MainInfoSection>
    </>
  );
};

export { DetailMainInfo };
