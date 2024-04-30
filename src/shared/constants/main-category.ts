export interface MainCategoryItemDto {
  id: number;
  title: string;
  item: {
    label: string;
    checked: boolean;
  }[];
}

export const mainCategory: MainCategoryItemDto[] = [
  {
    id: 0,
    title: '지역별',
    item: [
      {
        label: '서울',
        checked: false,
      },
      {
        label: '대구',
        checked: false,
      },
      {
        label: '인천',
        checked: false,
      },
      {
        label: '광주',
        checked: false,
      },
      {
        label: '대전',
        checked: false,
      },
      {
        label: '울산',
        checked: false,
      },
      {
        label: '세종',
        checked: false,
      },
      {
        label: '경기',
        checked: false,
      },
      {
        label: '강원',
        checked: false,
      },
      {
        label: '충북',
        checked: false,
      },
      {
        label: '충남',
        checked: false,
      },
      {
        label: '전북',
        checked: false,
      },
      {
        label: '전남',
        checked: false,
      },
      {
        label: '경북',
        checked: false,
      },
      {
        label: '경남',
        checked: false,
      },
      {
        label: '제주',
        checked: false,
      },
      {
        label: '해외',
        checked: false,
      },
    ],
  },
  {
    id: 1,
    title: '동물별',
    item: [
      {
        label: '강아지',
        checked: false,
      },
      {
        label: '고양이',
        checked: false,
      },
      {
        label: '기타',
        checked: false,
      },
    ],
  },
  {
    id: 2,
    title: '상품별',
    item: [
      {
        label: '사료',
        checked: false,
      },
      {
        label: '장난감',
        checked: false,
      },
      {
        label: '옷',
        checked: false,
      },
      {
        label: '악세사리',
        checked: false,
      },
      {
        label: '기타',
        checked: false,
      },
    ],
  },
];
