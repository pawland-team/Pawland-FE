import { RoundedArrowButton } from './rounded-arrow-button';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'atoms/buttons/RoundedArrowButton',
  component: RoundedArrowButton,
  argTypes: {
    direction: {
      options: ['down', 'up', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleClick: (e) => console.log(e),
    ButtonSize: 53,
    arrowSize: 20,
    direction: 'down',
  },
};
