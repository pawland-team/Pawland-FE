import { ReactNode } from 'react';

import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import * as S from './layout-style';

interface LayoutProps {
  children: ReactNode;
  className: any;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <>
      <S.LayoutPage className={className}>
        <Header isLoggedIn={false} />
        <main>{children}</main>
        <Footer />
      </S.LayoutPage>
    </>
  );
};

export { Layout };
