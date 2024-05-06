// import { rest } from 'msw';

import { ProductInfoEntity } from './dto';

export interface ProductDetailType extends ProductInfoEntity {
  isWished: boolean;
}

export const mockProductDetailInfo: ProductDetailType = {
  id: 1,
  category: 'toy',
  price: 0,
  productName: '강아지가 환장하는 미친 장난감 울집 강아지 너무 놀아 살이 쏙빠져버림 누군가 가져가주세요.',
  region: '서울',
  species: 'dog',
  views: 20,
  imageThumbnail: '/images/mock/product-card-test-image.png',
  imageUrls: [
    '/images/mock/product-card-test-image.png',
    '/images/test/test-image1.png',
    '/images/test/test-image2.png',
    '/images/banner/main-banner.png',
    '/images/test/test-image1.png',
    '/images/test/test-image2.png',
  ],
  description:
    "<img src='/images/mock/product-card-test-image.png' alt='test image'/><br/><br/>보이시죠. 우리 강아지가 이 마법같은 장난감 가지고 놀다가<br/><br/>5kg가 빠져버렸어요. 누군가 이 사악한 장난감을 가져가주세요. 제발~<br/><br/><br/><br/><img src='/images/test/test-image1.png' alt='test'/><br/><br/><img src='/images/test/test-image2.png' alt='테스트' />",
  createdAt: '2024.05.06',
  saleState: 'selling',
  seller: {
    id: 0,
    profileImage:
      'https://mblogthumb-phinf.pstatic.net/MjAyMzExMDRfMzIg/MDAxNjk5MDg2MzgwMjUy.lJyAk6Jbofs0JCpCTJ_0i083P10f11VJO13QJC_Fo30g.nQQBaD5VI1MAuSRGSlRfN02Xt5Tj_ZcJmTIdO5NHpBQg.JPEG.ghkdwjdtka/download.jpg?type=w800',
    nickname: 'Mr Gildong',
    email: 'oootest@NavContainer.co',
    userIntroduce: '안냐세요',
    stars: 5,
    loginType: '카카오',
  },
  productCondition: 'used',
  isWished: true,
};

// export const userHandlers = [
//   rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/1`, (_req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(mockProductDetailInfo));
//   }),
// ];
