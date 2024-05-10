import styled from 'styled-components';

import { SwiperPaginationReset } from '@shared/ui/styles/utils';

export const mainBannerSwiperBox = styled.div`
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 400px;

  border-radius: 20px;

  .swiper {
    height: 100%;
  }

  .swiper-slide {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .description-box {
    position: absolute;
    bottom: 55px;
    left: 63px;
    width: 100%;

    h2 {
      transform: translateX(100px);

      margin-bottom: 12px;

      font-size: 4rem;
      font-weight: 700;

      opacity: 0;

      transition: 0.4s 0.3s;
    }

    p {
      transform: translateX(100px);

      font-size: 1.6rem;
      font-weight: 700;
      line-height: 28px;
      color: #4d5053;

      opacity: 0;

      transition: 0.4s 0.7s;
    }

    button {
      transform: translateX(100px);
      margin-top: 12px;
      opacity: 0;
      transition: 0.4s 0.5s;
    }

    &.active {
      h2 {
        transform: translateX(0);
        opacity: 1;
      }

      p {
        transform: translateX(0);
        opacity: 1;
      }

      button {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  .swiper-pagination {
    ${SwiperPaginationReset}
  }
`;
