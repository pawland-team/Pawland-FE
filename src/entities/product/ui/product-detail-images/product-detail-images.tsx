import { useState } from 'react';

import Image from 'next/image';

import { SubImagesSlide } from '@shared/ui/product';

import * as S from './product-detail-images-style';

interface ProductDetailImagesProps {
  thumbnailSrc: string;
  subImagesList: string[];
}

const ProductDetailImages = ({ thumbnailSrc, subImagesList }: ProductDetailImagesProps) => {
  if (subImagesList !== undefined && subImagesList.length > 0) {
    // 썸네일 이미지를 subImageList 맨 앞에 넣어줌
    const modifiedImageList = [thumbnailSrc, ...subImagesList];
    // 선택된 Image를 저장한다.
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
      <S.ProductDetailImagesArea>
        <SubImagesSlide
          imagesList={modifiedImageList}
          setSelectedIndex={setSelectedImageIndex}
          selectedIndex={selectedImageIndex}
        />
        <S.DetailThumbnailBox>
          <Image src={modifiedImageList[selectedImageIndex]} fill sizes='582px' alt='상품 대표 이미지' />
        </S.DetailThumbnailBox>
      </S.ProductDetailImagesArea>
    );
  }

  return (
    <S.ProductDetailImagesArea>
      <S.DetailThumbnailBox>
        <Image src={thumbnailSrc} fill sizes='582px' alt='상품 대표 이미지' />
      </S.DetailThumbnailBox>
    </S.ProductDetailImagesArea>
  );
};

export { ProductDetailImages };
