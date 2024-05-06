import { PropsWithChildren } from 'react';

import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@app/styles/global';
import { theme } from '@shared/ui/styles/theme';

type StyldThemeProviderProps = PropsWithChildren;

export const StyledThemeProvider = ({ children }: StyldThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
