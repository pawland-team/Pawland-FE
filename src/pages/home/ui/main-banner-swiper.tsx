import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CommonButton } from '@shared/ui/buttons';

import * as S from './main-banner-swiper-style';
import { MainBannerArray } from '../lib/dto';

interface MainBannerProps {
  mainBannerList: MainBannerArray[];
}
const MainBannerSwiper = ({ mainBannerList }: MainBannerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleClickJoin = () => {
    router.push('/signup');
  };

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
              <p dangerouslySetInnerHTML={{ __html: banner.description }} />
              <CommonButton handleClick={handleClickJoin} maxWidth={'174px'}>
                {banner.buttonText}
              </CommonButton>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </S.mainBannerSwiperBox>
  );
};

export { MainBannerSwiper };
