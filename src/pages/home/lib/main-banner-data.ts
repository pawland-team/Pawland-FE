// import banner1 from '@/public/images/banner/main-banner.png';

import { MainBannerArray } from './dto';

export const mainBannerData: MainBannerArray[] = [
  {
    id: 0,
    title: '포랜드의 가족이 되어주세요!',
    description:
      '반려동물과 함께하는 즐거움, Pawland에서 시작하세요! <br>지금 가입하고 반려동물 커뮤니티와 중고 거래의 모든 혜택을 누리세요.',
    imageSrc: '/images/banner/main-banner.png',
    buttonText: '회원가입하기',
    link: '/signup',
  },
  {
    id: 1,
    title: '강아지',
    description:
      '합리적인 가격에 반려동물 용품을 구입하고 싶다면? <br>이제 Pawland에서 쉽고 빠르게 원하는 물건을 찾아보세요',
    imageSrc: '/images/banner/main-banner.png',
    buttonText: '상품 구경하기',
    link: '/product',
  },
  {
    id: 2,
    title: '강아지',
    description:
      '최신 반려동물 정보부터 유익한 팁까지! <br>Pawland 커뮤니티 게시판에서 다양한 정보를 공유하고 소통해보세요',
    imageSrc: '/images/banner/main-banner.png',
    buttonText: '커뮤니티 바로가기',
    link: '/community/list',
  },
];
