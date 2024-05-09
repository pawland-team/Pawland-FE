import { useState } from 'react';

import Image from 'next/image';

import { SubImagesSlide } from '@shared/ui/product';

import * as S from './product-detail-images-style';

interface ProductDetailImagesProps {
  ThumbnailSrc: string;
  SubImagesList: string[];
}

const ProductDetailImages = ({ ThumbnailSrc, SubImagesList }: ProductDetailImagesProps) => {
  // 썸네일 이미지를 subImageList 맨 앞에 넣어줌
  const modifiedImageList = [ThumbnailSrc, ...SubImagesList];
  // 선택된 Image를 저장한다.
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <S.ProductDetailImagesArea>
      {SubImagesList.length > 0 && (
        <SubImagesSlide
          imagesList={modifiedImageList}
          setSelectedIndex={setSelectedImageIndex}
          selectedIndex={selectedImageIndex}
        />
      )}
      <S.DetailThumbnailBox>
        <Image src={modifiedImageList[selectedImageIndex]} fill sizes='582px' alt='상품 대표 이미지' />
      </S.DetailThumbnailBox>
    </S.ProductDetailImagesArea>
  );
};

export { ProductDetailImages };
