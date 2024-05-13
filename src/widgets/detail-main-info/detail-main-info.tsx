import { ProductDetailContent, ProductDetailImages, ProductDetailInfo } from '@entities/product/ui';
import { ProductListItemDto } from '@shared/apis/product-api';

import * as S from './detail-main-info-style';

interface DetailMainInfoProps {
  itemData: ProductListItemDto;
}

const DetailMainInfo = ({ itemData }: DetailMainInfoProps) => {
  return (
    <>
      <S.MainInfoSection>
        <div className='info-container'>
          <ProductDetailImages
            SubImagesList={itemData.imageUrls}
            ThumbnailSrc={
              itemData.thumbnailImage === undefined
                ? '/images/product/default-card-thumbnail.png'
                : itemData.thumbnailImage
            }
          />
          <ProductDetailInfo id={itemData.id} detailInfo={itemData} />
        </div>
        <S.DivideLine />
        <div className='content-container'>
          <ProductDetailContent detailContent={itemData.content} />
        </div>
      </S.MainInfoSection>
    </>
  );
};

export { DetailMainInfo };
