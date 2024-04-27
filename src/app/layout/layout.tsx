import { ReactNode } from 'react';

import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import * as S from './layout-style';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <S.LayoutPage>
        <Header isLoggedIn={false} />
        <main>{children}</main>
        <Footer />
      </S.LayoutPage>
    </>
  );
};

export { Layout };
