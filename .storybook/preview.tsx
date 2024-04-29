import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/shared/ui/styles/theme/index';

import React from 'react';
import GlobalStyle from '../src/app/styles/global';

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

  decorators: [
    (Story, context) => {
      return (
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Story {...context} />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
