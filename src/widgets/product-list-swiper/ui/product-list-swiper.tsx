import { useState } from 'react';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { ProductCardItem } from '@entities/product/product-card-item/product-card-item';
import { mainProductInfo } from '@shared/apis/main-list-api/dto';
import { RoundedArrowButton } from '@shared/ui/buttons';

import * as S from './product-list-swiper-style';

interface ProductListSwiperProps {
  productList: mainProductInfo[];
}

const ProductListSwiper = ({ productList }: ProductListSwiperProps) => {
  const [swiper, setSwiper] = useState<SwiperClass>();

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
        // onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        onSwiper={(e) => {
          setSwiper(e);
        }}
        speed={500}
        loop
      >
        {productList.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCardItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <RoundedArrowButton handleClick={handlePrev} />
      <RoundedArrowButton handleClick={handleNext} />
    </S.ProductListSwiperBox>
  );
};

export { ProductListSwiper };
