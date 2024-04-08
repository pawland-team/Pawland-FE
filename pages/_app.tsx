import type {} from 'styled-components/cssprop';
import Head from 'next/head';

import '@app/styles/global.css';
import { LibConfigProviders } from '@app/providers/lib-config-providers';
import { ModalList, ModalListProvider } from '@shared/hooks/use-modal';

import type { AppProps } from 'next/app';

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
          <Component {...pageProps} />;
          <ModalList />
        </ModalListProvider>
      </LibConfigProviders>
    </>
  );
}
