import { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { Footer } from '@shared/ui/footer';
import { Header } from '@widgets/header';

import 'react-toastify/dist/ReactToastify.css';
import * as S from './layout-style';

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
          <main>{children}</main>
          <Footer />
          <S.StyledToastContainer
            position='bottom-center' // 알람 위치 지정
            autoClose={3000} // 자동 off 시간
            hideProgressBar={false} // 진행시간바 숨김
            closeOnClick // 클릭으로 알람 닫기
            rtl={false} // 알림 좌우 반전
            pauseOnFocusLoss={false} // focus 벗어나면 알람 정지
            theme='light'
          />
        </S.LayoutPage>
      </>
    );
  }

  return (
    <S.LayoutPage>
      <main>{children}</main>
      <S.StyledToastContainer
        position='bottom-center'
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        theme='light'
      />
    </S.LayoutPage>
  );
};

export { Layout };
