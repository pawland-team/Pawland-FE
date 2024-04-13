import { HydrationBoundary } from '@tanstack/react-query';
import Head from 'next/head';

import type {} from 'styled-components/cssprop';

import { MSWComponent } from '@app/lib/msw-component';
import { LibConfigProviders } from '@app/providers';
import { ModalList, ModalListProvider } from '@shared/hooks/use-modal';

import type { AppProps } from 'next/app';

import '@app/styles/global.css';

if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  (async () => {
    const { initMSW } = await import('@mocks/index');
    await initMSW();
  })();
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <link rel='icon' type='image/svg+xml' href='/next.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <LibConfigProviders>
        <ModalListProvider>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <MSWComponent>
              <Component {...pageProps} />
            </MSWComponent>
          </HydrationBoundary>
          <ModalList />
        </ModalListProvider>
      </LibConfigProviders>
    </>
  );
}
