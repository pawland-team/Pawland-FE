import Link from 'next/link';

import * as S from './post-detail-page-style';

export const CommunityPostDetailPage = () => {
  return (
    <S.PostDetailPage>
      <S.HeaderArea>
        <S.HeaderButtonBox>
          <Link href='/community/list'>
            <S.BacktoListButton>
              <S.HeaderButtonText>목록으로 이동</S.HeaderButtonText>
            </S.BacktoListButton>
          </Link>
        </S.HeaderButtonBox>
        <div>
          <div>제목 영역</div>
        </div>
        <div>
          <div>수정 댓글 추천 영역</div>
        </div>
      </S.HeaderArea>
      <div>본문 영역</div>
      <div>추천버튼 영역</div>
      <div>댓글 영역</div>
      <div>페이지네이션</div>
    </S.PostDetailPage>
  );
};
