import { ReactNode } from 'react';

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
        <Header />
        <main>{children}</main>
      </S.LayoutPage>
    </>
  );
};

export { Layout };
