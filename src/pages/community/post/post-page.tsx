import Image from 'next/image';

import * as S from './post-page-style';

export const CommunityPostPage = () => {
  return (
    <S.PostPage>
      <S.HeaderArea>
        <S.HeaderTitle>커뮤니티 등록</S.HeaderTitle>
        <S.ButtonArea>
          <S.TempSaveButton>
            <S.TempSaveButtonText>임시저장</S.TempSaveButtonText>
          </S.TempSaveButton>
          <S.PostButton>
            <S.PostButtonIconWrapper>
              <Image src='/images/button/add-button.svg' alt='add-button' fill />
            </S.PostButtonIconWrapper>
            <S.buttonTextWrapper>커뮤니티 등록</S.buttonTextWrapper>
          </S.PostButton>
        </S.ButtonArea>
      </S.HeaderArea>

      <S.CategoryArea>
        <S.CategoryTitle>지역 선택</S.CategoryTitle>
      </S.CategoryArea>

      <h1>게시글 제목 입력 영역</h1>
      <h1>텍스트 에디터 영역</h1>
      <h1>대표 이미지 업로드 영역</h1>
    </S.PostPage>
  );
};
