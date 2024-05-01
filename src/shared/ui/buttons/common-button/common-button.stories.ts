import { CommonButton } from './common-button';

import type { StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'atoms/buttons/CommonButton',
  component: CommonButton,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '버튼입니다.',
    borderRadius: '6px',
    backgroundColor: '#000',
    maxWidth: '100%',
    fontWeight: '400',
    fontSize: '1.6rem',
    fontColor: '#fff',
    padding: '10px 0',
    type: 'button',
    disabled: false,
  },
};
