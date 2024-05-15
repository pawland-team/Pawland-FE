import { useEffect, useState } from 'react';

import * as S from './tap-menu-bar-style';
import { useActiveMenuStore } from '@shared/store/use-active-menu-store';

interface ActiveMenuState {
  activeMenu: string;
  setActiveMenu: (menuName: string) => void;
}

export const TransactionTapMenuBar = () => {
  const activeMenu = useActiveMenuStore((state: ActiveMenuState) => state.activeMenu);
  const setActiveMenu = useActiveMenuStore((state: ActiveMenuState) => state.setActiveMenu);

  const handleButtonClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

  return (
    <S.TapMenuBar>
      <S.MenuButton $isActive={activeMenu === 'buy'} onClick={() => handleButtonClick('buy')}>
        구매내역
      </S.MenuButton>
      <S.MenuButton $isActive={activeMenu === 'sell'} onClick={() => handleButtonClick('sell')}>
        판매내역
      </S.MenuButton>
    </S.TapMenuBar>
  );
};
