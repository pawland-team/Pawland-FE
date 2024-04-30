import Image from 'next/image';
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
          <S.HeaderTitle>안녕하세요. 고민이 있어요. 들어주세요.</S.HeaderTitle>
          <S.HeaderDate>2024.05.01</S.HeaderDate>
        </S.HeaderTitleBox>

        <S.CommunityStatusBox>
          <S.StatusText>수정</S.StatusText>
          <S.Divider />
          <S.StatusText>댓글 100</S.StatusText>
          <S.Divider />
          <S.StatusText>추천 100</S.StatusText>
        </S.CommunityStatusBox>
      </S.HeaderArea>

      <S.ContentsArea>
        <S.Contents>
          <S.ContentsParagraph>몽환의숲</S.ContentsParagraph>
          <Image src='/images/test/test-image2.png' alt='test-image2' width={800} height={600} />

          <S.ContentsParagraph>이 새벽을 비추는 초생달 오감보다 생생한 육감의 세계로 보내주는</S.ContentsParagraph>
          <S.ContentsParagraph>푸르고 투명한 파랑새 술 취한 몸이 잠든 이 거릴 휘젓고 다니다 만나는</S.ContentsParagraph>
          <S.ContentsParagraph>마지막 신호등이 뿜는 붉은 신호를 따라 회색 거리를 걸어서</S.ContentsParagraph>
          <S.ContentsParagraph>
            가다 보니 좀 낯설어 보이는 그녀가 보인적 없던 눈물로 나를 반겨 태양보다 뜨거워진 나 그녀의 가슴에 안겨
          </S.ContentsParagraph>
        </S.Contents>
        <div>추천버튼 영역</div>
      </S.ContentsArea>

      <div>댓글 영역</div>
      <div>페이지네이션</div>
    </S.PostDetailPage>
  );
};
