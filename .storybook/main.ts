import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  // staticDirs: ['../public'],
  staticDirs: [
    {
      from: '../src/app/styles/font/pretendard',
      to: '/src/app/styles/font/pretendard',
    },
    {
      from: '../public/images',
      to: '/images',
    },
    {
      from: '../public',
      to: '/',
    },
  ],
};
export default config;
