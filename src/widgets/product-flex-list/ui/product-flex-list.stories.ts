import { mainListData } from '@shared/apis/main-list-api/main-list-mock';

import { ProductFlexList } from './product-flex-list';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'molecules/product/ProductFlexList',
  component: ProductFlexList,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cardListFlexGap: '60px 30px',
    cardItemFlexGap: 23,
    cardItemNumberPerRow: 4,
    flexWrap: 'wrap',
    listData: mainListData,
  },
};