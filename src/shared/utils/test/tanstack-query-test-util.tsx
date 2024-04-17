import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';

export const createWrapper = () => {
  // https://tanstack.com/query/latest/docs/framework/react/guides/testing?from=reactQueryV3#_top
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // https://tanstack.com/query/latest/docs/framework/react/guides/testing?from=reactQueryV3#set-gctime-to-infinity-with-jest
        gcTime: Infinity,
      },
    },
  });

  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = 'TestWrapper';

  return Wrapper;
};

// https://testing-library.com/docs/react-testing-library/setup#custom-render
const renderWithQueryClientProvider = (ui: React.ReactNode, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: createWrapper(), ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithQueryClientProvider as render };
