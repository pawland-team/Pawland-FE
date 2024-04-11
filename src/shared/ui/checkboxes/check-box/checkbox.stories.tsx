import { CheckBox } from './checkbox';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'shared/ui/check-box/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: '기본 체크박스',
  args: {},
};
