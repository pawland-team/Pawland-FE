import { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './spinner';

const meta = {
  title: 'atoms/loading/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: '50px',
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 로딩 스피너',
};
