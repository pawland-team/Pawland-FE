import { CommonSelectBox } from './common-select-box';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'organisms/selects/CommonSeleectBox',
  component: CommonSelectBox,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedName: '최신순',
    dropdownList: [
      {
        id: 0,
        name: '최신순',
      },
      {
        id: 1,
        name: '조회순',
      },
      {
        id: 2,
        name: '인기순',
      },
      {
        id: 3,
        name: '낮은 가격순',
      },
      {
        id: 4,
        name: '높은 가격순',
      },
    ],
  },
};
