import { Header } from '@widgets/header';

import type { StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'organisms/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
