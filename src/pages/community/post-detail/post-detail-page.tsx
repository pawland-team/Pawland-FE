import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import * as S from './post-detail-page-style';

export const CommunityPostDetailPage = () => {
  const [isHover, setIsHover] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const communityPostDetailQueryKey = 'communityPostDetail';

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

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
          <S.HeaderSpanWrapper>
            <S.HeaderDate>닉네임</S.HeaderDate>
            <S.HeaderDate>2024.05.01</S.HeaderDate>
          </S.HeaderSpanWrapper>
        </S.HeaderTitleBox>

        <S.CommunityStatusBox>
          <S.FlexBox>
            <S.StatusText>댓글 100</S.StatusText>
            <S.Divider />
            <S.StatusText>추천 100</S.StatusText>
            <S.Divider />
            <S.StatusText>조회수 100</S.StatusText>
          </S.FlexBox>
          <S.EditBox>
            <Image src='/images/icon/edit-icon.svg' alt='edit-icon' width={20} height={20} />
            <S.StatusText>수정하기</S.StatusText>
          </S.EditBox>
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

        <S.RecommendButtonBox>
          <S.RecommendButton
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={handleLike}
            isLiked={isLiked}
          >
            <S.LikeIconWrapper>
              <Image
                src={isHover || isLiked ? '/images/icon/like-icon-hover.svg' : '/images/icon/like-icon-default.svg'}
                alt='like-icon'
                fill
              />
            </S.LikeIconWrapper>
            <S.LikeButtonText>추천해요!</S.LikeButtonText>
          </S.RecommendButton>
        </S.RecommendButtonBox>
      </S.ContentsArea>

      {/* 댓글 입력 컴포넌트 */}
      <S.CommentArea>
        <S.ComentBox>
          <S.ProfileImageWrapper>
            <Image src='/images/test/test-image1.png' alt='test-image1' width={60} height={60} />
          </S.ProfileImageWrapper>
          <S.ComentPostBox>
            <S.ComentTextareaBox>
              <S.ProfileNickname>힙합페페</S.ProfileNickname>
              <S.ComentTextarea placeholder='댓글을 입력해주세요.' />
            </S.ComentTextareaBox>
            <S.ComentPostButtonWrapper>
              <S.ComentPostButton>댓글 등록하기</S.ComentPostButton>
            </S.ComentPostButtonWrapper>
          </S.ComentPostBox>
        </S.ComentBox>

        {/* 댓글 컴포넌트 */}

        <S.ComentBox>
          <S.ProfileImageWrapper>
            <Image src='/images/test/test-image1.png' alt='test-image1' width={60} height={60} />
          </S.ProfileImageWrapper>
          <S.ComentPostBox>
            <S.ComentTextareaBox>
              <S.ProfileNickname>키네틱플로우</S.ProfileNickname>
              <S.PostDateText>2024.05.01</S.PostDateText>
              <S.Coment>우리 사랑하지 말아요. 아직 잘 모르잖아요. 사실 조금은 두려운거야. 그대 미안해요.</S.Coment>
            </S.ComentTextareaBox>

            <S.ReplyBox>
              <S.ReplyPostButtonWrapper>
                <S.ReplyPostStatus>답글 0</S.ReplyPostStatus>
              </S.ReplyPostButtonWrapper>

              <S.ReplyWrapper>
                <S.ProfileImageWrapper>
                  <Image src='/images/test/test-image2.png' alt='test-image2' width={60} height={60} />
                </S.ProfileImageWrapper>

                <S.ComentPostBox>
                  <S.ProfileNickname>힙합페페</S.ProfileNickname>
                  <S.ComentTextarea placeholder='답글을 입력해주세요.' />

                  <S.ComentPostButtonWrapper>
                    <S.ReplyPostButton>답글 등록하기</S.ReplyPostButton>
                  </S.ComentPostButtonWrapper>
                </S.ComentPostBox>
              </S.ReplyWrapper>
            </S.ReplyBox>
          </S.ComentPostBox>
        </S.ComentBox>

        {/* 답글 컴포넌트 */}
        <S.ComentBox>
          <S.ProfileImageWrapper>
            <Image src='/images/test/test-image1.png' alt='test-image1' width={60} height={60} />
          </S.ProfileImageWrapper>
          <S.ComentPostBox>
            <S.ComentTextareaBox>
              <S.ProfileNickname>키네틱플로우</S.ProfileNickname>
              <S.PostDateText>2024.05.01</S.PostDateText>
              <S.Coment>늦은 밤 비가 내려와, 널 데려와 젖은 기억 끝에 뒤척여</S.Coment>
            </S.ComentTextareaBox>
            <S.ReplyBox>
              <S.ReplyPostButtonWrapper>
                <S.ReplyPostStatus>답글 2</S.ReplyPostStatus>
              </S.ReplyPostButtonWrapper>

              <S.ReplyWrapper>
                <S.ProfileImageWrapper>
                  <Image src='/images/test/test-image2.png' alt='test-image2' width={60} height={60} />
                </S.ProfileImageWrapper>

                <S.ComentPostBox>
                  <S.ProfileNickname>힙합페페</S.ProfileNickname>
                  <S.PostDateText>2024.05.01</S.PostDateText>
                  <S.Coment>암쏘쏘리 벗알러뷰 다거짓말</S.Coment>
                </S.ComentPostBox>
              </S.ReplyWrapper>

              <S.ReplyWrapper>
                <S.ProfileImageWrapper>
                  <Image src='/images/test/test-image2.png' alt='test-image2' width={60} height={60} />
                </S.ProfileImageWrapper>

                <S.ComentPostBox>
                  <S.ProfileNickname>힙합페페</S.ProfileNickname>
                  <S.PostDateText>2024.05.01</S.PostDateText>
                  <S.Coment>이야 몰랐어 이제야 알았어 니가 필요해</S.Coment>
                </S.ComentPostBox>
              </S.ReplyWrapper>

              <S.ReplyWrapper>
                <S.ProfileImageWrapper>
                  <Image src='/images/test/test-image2.png' alt='test-image2' width={60} height={60} />
                </S.ProfileImageWrapper>
                <S.ComentPostBox>
                  <S.ProfileNickname>힙합페페</S.ProfileNickname>
                  <S.ComentTextarea placeholder='답글을 입력해주세요.' />
                  <S.ComentPostButtonWrapper>
                    <S.ReplyPostButton>답글 등록하기</S.ReplyPostButton>
                  </S.ComentPostButtonWrapper>
                </S.ComentPostBox>
              </S.ReplyWrapper>
            </S.ReplyBox>
          </S.ComentPostBox>
        </S.ComentBox>
      </S.CommentArea>
    </S.PostDetailPage>
  );
};
