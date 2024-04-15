import { fn, userEvent, within } from '@storybook/test';

import { NormalButton } from './normal-button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button/NormalButton',
  component: NormalButton,
  // https://storybook.js.org/docs/api/parameters#available-parameters
  parameters: {
    controls: {
      include: ['backgroundColor', 'size'],
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      // https://storybook.js.org/docs/essentials/controls
      control: {
        type: 'select',
        options: ['red', 'blue', 'green'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof NormalButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: '기본 버튼',
  args: {
    backgroundColor: 'blue',
    size: 'large',
    children: '나는 버튼',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const primaryButton = await canvas.findByText(/나는 버튼/, { selector: 'button' });
    await userEvent.click(primaryButton);
  },
};

export const Secondary: Story = {
  name: '보조 버튼',
  args: {
    backgroundColor: 'green',
    size: 'medium',
    children: '그래 너 버튼',
  },
};

export const Tertiary: Story = {
  name: '세 번째 버튼',
  args: {
    backgroundColor: 'red',
    size: 'small',
    children: '세 번째 버튼',
  },
};

export const Quaternary: Story = {
  name: '네 번째 버튼',
  args: {
    backgroundColor: 'red',
    size: 'small',
    children: '세 번째 버튼',
  },
};
