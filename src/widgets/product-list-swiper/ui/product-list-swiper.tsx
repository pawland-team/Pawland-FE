import { useState } from 'react';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { ProductCardItem } from '@entities/product/ui';
import { ProductListItemDto } from '@shared/apis/product-api';
import { RoundedArrowButton } from '@shared/ui/buttons';

import * as S from './product-list-swiper-style';

interface ProductListSwiperProps {
  productList: ProductListItemDto[];
}

const ProductListSwiper = ({ productList }: ProductListSwiperProps) => {
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    swiper?.slidePrev();
  };

  const handleNext = () => {
    swiper?.slideNext();
  };

  return (
    <S.ProductListSwiperBox>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={4}
        onSlideChange={(e) => {
          setIsBeginning(e.isBeginning);
          setIsEnd(e.isEnd);
        }}
        onSwiper={(e) => {
          setSwiper(e);
        }}
        speed={500}
        loop={false}
      >
        {productList.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCardItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {productList.length > 4 && (
        <>
          <S.NavigationLeft>
            <RoundedArrowButton disabled={isBeginning} handleClick={handlePrev} direction='left' />
          </S.NavigationLeft>
          <S.NavigationRight>
            <RoundedArrowButton disabled={isEnd} handleClick={handleNext} direction='right' />
          </S.NavigationRight>
        </>
      )}
    </S.ProductListSwiperBox>
  );
};

export { ProductListSwiper };
