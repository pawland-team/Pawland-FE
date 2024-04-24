import { AvatarImage } from './avatar-image';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'atoms/profile/AvatarImage',
  component: AvatarImage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatarWidth: 32,
    avatarHeight: 32,
    imageSrc: 'https://loremflickr.com/600/400',
    avatarBorderRadius: 50,
  },
};
