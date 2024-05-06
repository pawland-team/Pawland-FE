import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/shared/ui/styles/theme/index';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import GlobalStyle from '../src/app/styles/global';

// @see https://storybook.js.org/addons/msw-storybook-addon/
// @see version 1 https://github.com/mswjs/msw-storybook-addon/blob/eaed8ea9dfd8f9250212316ce2f46734b15cf27e/README.md
// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
});

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'white',
        },
        {
          name: 'dark',
          value: 'black',
        },
      ],
    },
    // actions: {
    //   argTypesRegex: '^on[A-Z].*',
    // }
  },

  // Provide the MSW addon loader globally
  loaders: [mswLoader],

  decorators: [
    (Story, context) => {
      return (
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <QueryClientProvider client={mockedQueryClient}>
            <Story {...context} />
          </QueryClientProvider>
        </ThemeProvider>
      );
    },
  ],
};

// storybook에서 msw를 실행시키기 위한 코드
if (typeof global.process === 'undefined') {
  (async () => {
    const { worker } = await import('../src/mocks/browser');
    worker.start();
  })();
}

export default preview;
