import { PropsWithChildren } from 'react';

import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@shared/ui/styles/theme';

const Wrapper = ({ children }: PropsWithChildren) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

// https://testing-library.com/docs/react-testing-library/setup#custom-render
const renderWithStyledComponent = (ui: React.ReactNode, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithStyledComponent as render };
