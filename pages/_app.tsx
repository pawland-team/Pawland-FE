import { HydrationBoundary } from '@tanstack/react-query';
import localFont from 'next/font/local';
import Head from 'next/head';

import type {} from 'styled-components/cssprop';

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

const pretendard = localFont({
  src: [
    {
      path: './fonts/pretendard/Pretendard-ExtraBold.woff',
      weight: '800',
    },
    {
      path: './fonts/pretendard/Pretendard-Bold.woff',
      weight: '700',
    },
    {
      path: './fonts/pretendard/Pretendard-SemiBold.woff',
      weight: '600',
    },
    {
      path: './fonts/pretendard/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: './fonts/pretendard/Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: './fonts/pretendard/Pretendard-Light.woff',
      weight: '300',
    },
    {
      path: './fonts/pretendard/Pretendard-ExtraLight.woff',
      weight: '200',
    },
    {
      path: './fonts/pretendard/Pretendard-Thin.woff',
      weight: '100',
    },
  ],
  display: 'swap',
});

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
            <main className={`${pretendard.className}`}>
              <Component {...pageProps} />
            </main>
          </HydrationBoundary>
          <ModalList />
        </ModalListProvider>
      </LibConfigProviders>
    </>
  );
}
