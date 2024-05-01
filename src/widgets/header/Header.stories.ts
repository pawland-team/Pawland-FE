import { userHandlers, userHandlersError } from '@shared/apis/user-api';
import { Header } from '@widgets/header';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'organisms/layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
// @see https://blog.mathpresso.com/msw%EB%A1%9C-api-%EB%AA%A8%ED%82%B9%ED%95%98%EA%B8%B0-2d8a803c3d5c
LoggedOut.parameters = {
  msw: {
    handlers: [...userHandlers],
  },
};

export const LoggedIn: Story = {};
LoggedIn.parameters = {
  msw: {
    handlers: [...userHandlersError],
  },
};
