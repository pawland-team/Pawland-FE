import { HydrationBoundary } from '@tanstack/react-query';
import Head from 'next/head';

import type {} from 'styled-components/cssprop';

import { LibConfigProviders } from '@app/providers';
import { ModalList, ModalListProvider } from '@shared/hooks/use-modal';

import type { AppProps } from 'next/app';

import '@app/styles/global.css';

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
            <Component {...pageProps} />
          </HydrationBoundary>
          <ModalList />
        </ModalListProvider>
      </LibConfigProviders>
    </>
  );
}
