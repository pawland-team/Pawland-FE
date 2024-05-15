export interface CategoryArray {
  id: number;
  name: string;
  group: string;
  imageSrc: string;
}

export const categoryData: CategoryArray[] = [
  {
    id: 1,
    name: '강아지',
    group: 'species',
    imageSrc: '/images/icon/dog-icon.svg',
  },
  {
    id: 2,
    name: '고양이',
    group: 'species',
    imageSrc: '/images/icon/cat-icon.svg',
  },
  {
    id: 3,
    name: '사료',
    group: 'product',
    imageSrc: '/images/icon/food-icon.svg',
  },
  {
    id: 4,
    name: '장난감',
    group: 'product',
    imageSrc: '/images/icon/toy-icon.svg',
  },
  {
    id: 5,
    name: '악세서리',
    group: 'product',
    imageSrc: '/images/icon/acc-icon.svg',
  },
  {
    id: 6,
    name: '옷',
    group: 'product',
    imageSrc: '/images/icon/clothes-icon.svg',
  },
  {
    id: 7,
    name: '기타',
    group: 'product',
    imageSrc: '/images/icon/etc-icon.svg',
  },
];
