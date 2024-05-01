import { productListSortingData } from '../lib/product-list-sorting-data';
import { CommonSelectBox } from './common-select-box';

import type { StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'molecules/select-box/CommonSelectBox',
  component: CommonSelectBox,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedName: '최신순',
    dropdownList: productListSortingData,
  },
};
