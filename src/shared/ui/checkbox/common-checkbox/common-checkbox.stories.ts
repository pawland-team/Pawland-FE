import { CommonCheckBox } from './common-checkbox';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'atoms/checkbox/CommonCheckBox',
  component: CommonCheckBox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'label , id 그리고 htmlFor에도 동시에 들어감',
    },
    group: {
      control: 'text',
      description: 'checkbox를 하나로 묶어주는 역할을 하는 텍스트를 넣어야함',
    },
    checked: {
      control: 'boolean',
      description: 'default false임. 처음부터 체크되어있어야하는 경우에만 true 사용하면 됨.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '서울',
    group: '지역',
    checked: false,
  },
};
