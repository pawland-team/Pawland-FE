import { Dispatch, SetStateAction, useState } from 'react';

import Image from 'next/image';
import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { RoundedArrowButton } from '../buttons';

interface SubImagesSlideProps {
  imagesList: string[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}

const SubImagesSlide = ({ imagesList, selectedIndex, setSelectedIndex }: SubImagesSlideProps) => {
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    swiper?.slidePrev();
  };

  const handleNext = () => {
    swiper?.slideNext();
  };

  const handleSelectImage = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <SSubImagesSlideArea>
      {imagesList.length > 5 && (
        <SNavigationUp>
          <RoundedArrowButton ButtonSize={36} disabled={isBeginning} handleClick={handlePrev} direction='up' />
        </SNavigationUp>
      )}
      <Swiper
        direction={'vertical'}
        modules={[Navigation]}
        spaceBetween={7}
        slidesPerView={5}
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
        {imagesList.map((item, index) => (
          <SwiperSlide key={item}>
            <SSubImageBox
              className={index === selectedIndex ? 'active' : ''}
              role='button'
              onClick={() => handleSelectImage(index)}
            >
              <Image fill sizes='72px' alt='상세 이미지 자세히보기' src={item} />
            </SSubImageBox>
          </SwiperSlide>
        ))}
      </Swiper>
      {imagesList.length > 5 && (
        <SNavigationDown>
          <RoundedArrowButton ButtonSize={36} disabled={isEnd} handleClick={handleNext} direction='down' />
        </SNavigationDown>
      )}
    </SSubImagesSlideArea>
  );
};

export { SubImagesSlide };

const SSubImagesSlideArea = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 72px;
  height: 540px;

  .swiper {
    height: 434px;
  }
`;

const SNavigationUp = styled.div`
  position: relative;
`;

const SNavigationDown = styled.div`
  position: relative;
`;

const SSubImageBox = styled.div`
  cursor: pointer;

  position: relative;

  overflow: hidden;

  width: 72px;
  height: 72px;

  border-radius: 10px;

  &::after {
    content: '';

    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.modal};
    inset: 0;

    display: none;

    box-sizing: border-box;
    width: 100%;
    height: 100%;

    border: 2px solid ${({ theme }) => theme.color.blue_43ADFF};
    border-radius: 10px;
  }

  img {
    object-fit: cover;
  }

  &.active {
    &::after {
      display: block;
    }
  }

  &:hover {
    &::after {
      display: block;
    }
  }
`;
