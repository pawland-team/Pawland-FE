export interface MainCategoryItemDto {
  id: number;
  group: string;
  item: {
    label: string;
    checked: boolean;
  }[];
}

export const regionData: MainCategoryItemDto = {
  id: 0,
  group: '지역별',
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
};

export const speciesData: MainCategoryItemDto = {
  id: 1,
  group: '동물별',
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
      label: '그 외',
      checked: false,
    },
  ],
};

export const productCategoryData: MainCategoryItemDto = {
  id: 2,
  group: '상품별',
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
      label: '그 외',
      checked: false,
    },
  ],
};
