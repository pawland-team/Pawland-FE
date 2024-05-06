import { Footer } from './footer';

import type { StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'organisms/layout/Footer',
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
