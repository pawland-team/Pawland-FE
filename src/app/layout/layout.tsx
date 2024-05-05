import { ReactNode, Suspense } from 'react';

import { useRouter } from 'next/router';

import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import 'react-toastify/dist/ReactToastify.css';
import * as S from './layout-style';
import { Loading } from './loading';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  if (router.pathname !== '/login' && router.pathname !== '/signup') {
    return (
      <>
        <S.LayoutPage>
          <Header />
          <Suspense fallback={<Loading />}>
            <main>{children}</main>
          </Suspense>
          <Footer />
          <S.StyledToastContainer
            position='bottom-center' // 알람 위치 지정
            autoClose={4000} // 자동 off 시간
            hideProgressBar={false} // 진행시간바 숨김
            closeOnClick // 클릭으로 알람 닫기
            rtl={false} // 알림 좌우 반전
            theme='light'
          />
        </S.LayoutPage>
      </>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <main>{children}</main>
    </Suspense>
  );
};

export { Layout };
