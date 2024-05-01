import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductFlexCardItem } from '@entities/product/product-flex-card-item/product-flex-card-item';
import { mainProductInfo } from '@shared/apis/main-list-api/dto';

interface ProductListSwiperProps {
  productList: mainProductInfo[];
}

const ProductListSwiper = ({ productList }: ProductListSwiperProps) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={4}
      // onSlideChange={(e) => setActiveIndex(e.activeIndex)}
      // onSwiper={(swiper) => console.log(swiper)}
      speed={500}
    >
      {productList.map((item) => (
        <SwiperSlide key={item.id}>
          <ProductFlexCardItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export { ProductListSwiper };
