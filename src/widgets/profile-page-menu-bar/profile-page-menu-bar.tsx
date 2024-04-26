import * as S from './profile-page-menu-bar-style';

export const ProfilePageMenuBar = () => {
  return (
    <S.ProfilePageMenuBar>
      <S.FirstMenuButton>리뷰</S.FirstMenuButton>
      <S.BaseMenuButton>등록 상품</S.BaseMenuButton>
      <S.BaseMenuButton>찜한 상품</S.BaseMenuButton>
      <S.BaseMenuButton>거래 내역</S.BaseMenuButton>
      <S.LastMenuButton>커뮤니티</S.LastMenuButton>
    </S.ProfilePageMenuBar>
  );
};
