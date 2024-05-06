import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CommunityPostDetailEntity } from '@shared/apis/community-api/community-post-detail';

import * as S from './post-detail-page-style';

export const CommunityPostDetailPage = () => {
  const [isHover, setIsHover] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const communityPostDetailQueryKey = 'communityPostDetail';

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const fetchCommunityPostDetail = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/post-detail/${id}`);
    const data = await response.json();

    return data;
  };

  const { data: communityPostDetail, isLoading } = useQuery<CommunityPostDetailEntity, Error>({
    queryKey: [communityPostDetailQueryKey, id],
    queryFn: fetchCommunityPostDetail,
    enabled: !!id,
  });

  if (isLoading || !communityPostDetail) return <div>Loading...</div>;

  const {
    title,
    content,
    imageThumbnail,
    region,
    author,
    commentsCount,
    recommendationCount,
    views,
    comments,
    createdAt,
  } = communityPostDetail;

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
          <S.RegionSpan>{region}</S.RegionSpan>
          <S.HeaderTitle>{title}</S.HeaderTitle>
          <S.HeaderSpanWrapper>
            <S.HeaderDate>{author.nickname}</S.HeaderDate>
            <S.HeaderDate>{new Date(createdAt).toLocaleDateString()}</S.HeaderDate>
          </S.HeaderSpanWrapper>
        </S.HeaderTitleBox>

        <S.CommunityStatusBox>
          <S.FlexBox>
            <S.StatusText>댓글 {commentsCount}</S.StatusText>
            <S.Divider />
            <S.StatusText>추천 {recommendationCount}</S.StatusText>
            <S.Divider />
            <S.StatusText>조회수 {views}</S.StatusText>
          </S.FlexBox>
          <S.EditBox>
            <Image src='/images/icon/edit-icon.svg' alt='edit-icon' width={20} height={20} />
            <S.StatusText>수정하기</S.StatusText>
          </S.EditBox>
        </S.CommunityStatusBox>
      </S.HeaderArea>

      <S.ContentsArea>
        <S.Contents>
          {imageThumbnail && <Image src={imageThumbnail} alt='thumbnail' width={800} height={600} />}
          <S.ContentsParagraph>{content}</S.ContentsParagraph>
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
              <S.ProfileNickname>여기는 지금 로그인한 나의 닉네임이 들어갑니다.</S.ProfileNickname>
              <S.ComentTextarea placeholder='댓글을 입력해주세요.' />
            </S.ComentTextareaBox>
            <S.ComentPostButtonWrapper>
              <S.ComentPostButton>댓글 등록하기</S.ComentPostButton>
            </S.ComentPostButtonWrapper>
          </S.ComentPostBox>
        </S.ComentBox>

        {/* 댓글 컴포넌트 */}
        {comments.length > 0 &&
          comments.map((comment) => (
            <S.ComentBox key={comment.id}>
              <S.ProfileImageWrapper>
                <Image src={comment.author.profileImage} alt='profile-image' width={60} height={60} />
              </S.ProfileImageWrapper>
              <S.ComentPostBox>
                <S.ComentTextareaBox>
                  <S.ProfileNickname>{comment.author.nickname}</S.ProfileNickname>
                  <S.PostDateText>{new Date(comment.createdAt).toLocaleDateString()}</S.PostDateText>
                  <S.Coment>{comment.content}</S.Coment>
                </S.ComentTextareaBox>

                {/* 대댓글 컴포넌트 */}
                {comment.reply.length > 0 &&
                  comment.reply[0].id !== null &&
                  comment.reply.map((reply) => (
                    <S.ReplyWrapper key={reply.id}>
                      <S.ProfileImageWrapper>
                        <Image src={reply.author.profileImage} alt='reply-profile-image' width={60} height={60} />
                      </S.ProfileImageWrapper>
                      <S.ComentPostBox>
                        <S.ProfileNickname>{reply.author.nickname}</S.ProfileNickname>
                        <S.PostDateText>{new Date(reply.createdAt).toLocaleDateString()}</S.PostDateText>
                        <S.Coment>{reply.content}</S.Coment>
                      </S.ComentPostBox>
                    </S.ReplyWrapper>
                  ))}
                <S.EmptySpace />
                {/* 대댓글 입력 컴포넌트 */}
                <S.ReplyWrapper>
                  <S.ProfileImageWrapper>
                    <Image src='/images/test/test-image1.png' alt='test-image1' width={60} height={60} />
                  </S.ProfileImageWrapper>
                  <S.ComentPostBox>
                    <S.ProfileNickname>여기는 지금 로그인한 나의 닉네임이 들어갑니다.</S.ProfileNickname>
                    <S.ComentTextarea placeholder='답글을 입력해주세요.' />
                    <S.ComentPostButtonWrapper>
                      <S.ReplyPostButton>답글 등록하기</S.ReplyPostButton>
                    </S.ComentPostButtonWrapper>
                  </S.ComentPostBox>
                </S.ReplyWrapper>
              </S.ComentPostBox>
            </S.ComentBox>
          ))}
      </S.CommentArea>
    </S.PostDetailPage>
  );
};
