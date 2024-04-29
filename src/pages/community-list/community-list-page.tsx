import Image from 'next/image';

import * as S from './community-list-page-style';

export const CommunityListPage = () => {
  return (
    <S.CommunityListPage>
      <S.MainArea>
        <S.HeaderArea>
          <S.HeaderTitle>커뮤니티</S.HeaderTitle>
          <S.SearchBarContainer>
            <S.SearchIconWrapper>
              <Image src='/images/icon/search-icon.svg' alt='search-icon' fill />
            </S.SearchIconWrapper>
            <S.SearchBar placeholder='제목을 검색해주세요.' />
          </S.SearchBarContainer>
          <S.NewPostButton>
            <S.PostButtonIconWrapper>
              <Image src='/images/button/add-button.svg' alt='add-button' fill />
            </S.PostButtonIconWrapper>
            <S.buttonTextWrapper>새 글 등록</S.buttonTextWrapper>
          </S.NewPostButton>
        </S.HeaderArea>

        <div>
          <h1>카테고리</h1>
          <div>
            <h1>아이템 리스트</h1>
            <h1>페이지네이션</h1>
          </div>
        </div>
      </S.MainArea>
    </S.CommunityListPage>
  );
};
