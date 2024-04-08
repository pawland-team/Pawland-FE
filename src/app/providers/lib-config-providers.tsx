import { PropsWithChildren } from 'react';

import StyledThemeProvider from './styled-theme-provider';
import TanstackQueryProvider from './tanstack-query-provider';

type LibConfigProvidersProps = PropsWithChildren;

export const LibConfigProviders = ({ children }: LibConfigProvidersProps) => {
  return (
    <StyledThemeProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </StyledThemeProvider>
  );
};
