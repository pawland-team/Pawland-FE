import { ProductCardItem } from './product-card-item';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'molecules/product/ProductCardItem',
  component: ProductCardItem,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
