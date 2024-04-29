import { RecentProductList } from './recent-product-list';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'molecules/product/RecentProductList',
  component: RecentProductList,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
