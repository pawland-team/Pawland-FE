import { SearchInput } from '@shared/ui/inputs';

import type { StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'atoms/inputs/SearchInput',
  component: SearchInput,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '원하시는 상품을 검색해보세요!',
  },
};
