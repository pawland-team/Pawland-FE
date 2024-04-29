import { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

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
          <Header isLoggedIn={false} />
          <main>{children}</main>
          <Footer />
        </S.LayoutPage>
      </>
    );
  }

  return <main>{children}</main>;
};

export { Layout };
