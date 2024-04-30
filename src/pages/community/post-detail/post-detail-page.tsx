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

        <S.HeaderTitleBox>
          <S.RegionSpan>서울</S.RegionSpan>
          <S.HeaderTitle>안녕하세요. 저희 집 강아지 너무 귀엽죠.</S.HeaderTitle>
          <S.HeaderDate>2024.05.01</S.HeaderDate>
        </S.HeaderTitleBox>

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
