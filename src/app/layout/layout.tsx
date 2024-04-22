import { ReactNode } from 'react';

import { Header } from '@widgets/header';

import * as S from './layout-style';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <S.LayoutPage>
        <Header />
        <main>{children}</main>
      </S.LayoutPage>
    </>
  );
};

export { Layout };
