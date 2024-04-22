import { ReactNode } from 'react';

import { Header } from '@shared/ui/header';

import * as S from './layout-style';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <S.LayoutPage>
        <Header />
        {children}
      </S.LayoutPage>
    </>
  );
};

export { Layout };
