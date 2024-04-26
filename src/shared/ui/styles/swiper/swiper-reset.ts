import { css } from 'styled-components';

export const SwiperPaginationReset = css`
  right: 15px;
  bottom: 15px;
  left: auto;
  width: auto;

  .swiper-pagination-bullet {
    background-color: ${({ theme }) => theme.color.gray_BDBDBD};
  }

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.color.white_FFFFFF};
  }
`;
