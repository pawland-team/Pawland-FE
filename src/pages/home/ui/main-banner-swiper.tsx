import { useState } from 'react';

import DOMPurify from 'dompurify';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CommonLink } from '@shared/ui/buttons/common-link';

import * as S from './main-banner-swiper-style';
import { MainBannerArray } from '../lib/dto';

interface MainBannerProps {
  mainBannerList: MainBannerArray[];
}
const MainBannerSwiper = ({ mainBannerList }: MainBannerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <S.mainBannerSwiperBox>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        // onSwiper={(swiper) => console.log(swiper)}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        speed={500}
        pagination={{
          clickable: true,
        }}
        // loopAdditionalSlides={1}
        // loop
      >
        {mainBannerList.map((banner) => (
          <SwiperSlide key={banner.id}>
            {/* <img src={banner.imageSrc} alt={banner.title} /> */}
            <Image src={banner.imageSrc} alt={banner.title} fill sizes='1195px' priority />
            <div className={`description-box ${banner.id === activeIndex ? 'active' : ''}`}>
              <h2>{banner.title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(banner.description),
                }}
              />
              {banner.buttonText && banner.link ? (
                <CommonLink href={banner.link} maxWidth={'174px'}>
                  {banner.buttonText}
                </CommonLink>
              ) : null}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </S.mainBannerSwiperBox>
  );
};

export { MainBannerSwiper };
