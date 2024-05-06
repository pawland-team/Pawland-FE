import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { RoundProfile } from './round-profile';
import mockbird from '../../../../public/images/mock/bird-w64-h64.png';

const meta = {
  title: 'atoms/profile/RoundProfile',
  component: RoundProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      description: 'onClick event handler',
      type: 'function',
    },
    alt: {
      description: '프로필 이미지에 대한 설명',
      type: 'string',
    },
  },
  args: {
    onClick: fn(),
    src: mockbird,
  },
} satisfies Meta<typeof RoundProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 프로필',
  args: {
    alt: '새 사진',
    size: {
      onDesktop: {
        width: '64px',
        height: '64px',
      },
    },
  },
};
