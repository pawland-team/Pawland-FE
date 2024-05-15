import { HydrationBoundary } from '@tanstack/react-query';
import Head from 'next/head';
import type {} from 'styled-components/cssprop';

import { Layout } from '@app/layout';
import { StyledThemeProvider, TanstackQueryProvider } from '@app/providers';
import { ModalList, ModalListProvider } from '@shared/hooks/use-modal';
import 'react-quill/dist/quill.snow.css';

import type { AppProps } from 'next/app';

import 'swiper/css';
import 'swiper/css/pagination';

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
        <link rel='icon' type='image/svg+xml' href='/images/logo/favicon.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='반려동물을 사랑하는 이웃들과 교류해 보세요!' />
        <meta property='og:image' content='/images/banner/main-banner.png' key='image' />
        <meta property='og:title' content='반려동물을 위한 커뮤니티, PAWLAND' />
        <meta property='og:description' content='반려동물을 사랑하는 이웃들과 교류해 보세요!' />
        <meta property='og:url' content='https://pawland.store/' />
        <meta property='og:type' content='website' />
      </Head>
      <StyledThemeProvider>
        <TanstackQueryProvider>
          <ModalListProvider>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <ModalList />
            </HydrationBoundary>
          </ModalListProvider>
        </TanstackQueryProvider>
      </StyledThemeProvider>
    </>
  );
}
