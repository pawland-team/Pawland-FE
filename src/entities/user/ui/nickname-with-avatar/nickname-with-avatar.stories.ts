import { NicknameWithAvatar } from './nickname-with-avatar';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'molecules/profile/NicknameWithAvatar',
  component: NicknameWithAvatar,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageSrc: 'https://loremflickr.com/600/400',
    nickname: '홍길동',
  },
};
