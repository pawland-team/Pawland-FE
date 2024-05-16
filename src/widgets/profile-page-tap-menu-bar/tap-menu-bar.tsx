import { useState } from 'react';

import * as S from './tap-menu-bar-style';

export const TapMenuBar = () => {
  const [activeButton, setActiveButton] = useState('written');

  return (
    <S.TapMenuBar>
      <S.MenuButton $isActive={activeButton === 'written'} onClick={() => setActiveButton('written')}>
        구매내역
      </S.MenuButton>
      <S.MenuButton $isActive={activeButton === 'recommand'} onClick={() => setActiveButton('recommand')}>
        추천한 글
      </S.MenuButton>
      <S.MenuButton $isActive={activeButton === 'review'} onClick={() => setActiveButton('review')}>
        댓글단 글
      </S.MenuButton>
    </S.TapMenuBar>
  );
};
