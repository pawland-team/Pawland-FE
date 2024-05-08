import { ProductCardItem } from './product-card-item';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'molecules/product/ProductCardItem',
  component: ProductCardItem,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      id: 0,
      category: 'food',
      price: 20000, // 상품 가격
      productName: '강아지가 좋아하는 대형견용 사료 어떠신지?', // 상품 이름
      views: 20,
      imageThumbnail: 'https://loremflickr.com/600/400', // 대표 이미지
      isWished: false, // 내가 찜 했는지 안했는지
    },
  },
};
