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
    children: '로그인/회원가입',
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

export const WithBorder: Story = {
  args: {
    children: '상품 설명 더보기',
    borderRadius: '6px',
    backgroundColor: '#fff',
    maxWidth: '100%',
    fontWeight: '700',
    fontSize: '1.8rem',
    fontColor: '#43ADFF',
    padding: '23px 0',
    borderColor: '#43ADFF',
    borderWidth: '2px',
    type: 'button',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: '판매완료',
    borderRadius: '6px',
    backgroundColor: '#BDBDBD',
    maxWidth: '100%',
    fontWeight: '700',
    fontSize: '2.4rem',
    fontColor: '#fff',
    padding: '18px 0',
    type: 'button',
    disabled: true,
  },
};
