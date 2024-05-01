import { useActiveButtonStore } from '../../shared/store/use-active-button-store/use-active-button-store';
import * as S from './profile-page-menu-bar-style';

interface ActiveButtonState {
  activeButton: string;
  setActiveButton: (buttonName: string) => void;
}

export const ProfilePageMenuBar = () => {
  const activeButton = useActiveButtonStore((state: ActiveButtonState) => state.activeButton);
  const setActiveButton = useActiveButtonStore((state: ActiveButtonState) => state.setActiveButton);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <S.ProfilePageMenuBar>
      <S.FirstMenuButton $isActive={activeButton === 'register'} onClick={() => handleButtonClick('register')}>
        등록 상품
      </S.FirstMenuButton>
      <S.MenuButton $isActive={activeButton === 'wish'} onClick={() => handleButtonClick('wish')}>
        찜한 상품
      </S.MenuButton>
      <S.MenuButton $isActive={activeButton === 'transaction'} onClick={() => handleButtonClick('transaction')}>
        거래 내역
      </S.MenuButton>
      <S.LastMenuButton $isActive={activeButton === 'community'} onClick={() => handleButtonClick('community')}>
        커뮤니티
      </S.LastMenuButton>
    </S.ProfilePageMenuBar>
  );
};
