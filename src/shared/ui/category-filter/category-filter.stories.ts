import { CategoryFilter } from './category-filter';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'organisms/filter/CategoryFilter',
  component: CategoryFilter,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categoryItem: {
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
  },
};
