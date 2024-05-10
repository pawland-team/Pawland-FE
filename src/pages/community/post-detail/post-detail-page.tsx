import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetUserInfo } from '@entities/user/hooks';

import * as S from './post-detail-page-style';

type Author = {
  id: number;
  email: string;
  nickname: string;
};

type Comment = {
  id: number;
  author: Author;
  content: string;
  replies: string[];
  recommendCount: number;
  createdAt: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  region: string;
  views: number;
  author: Author;
  comments: Comment[];
  createdAt: string;
  recommendCount: number;
  recommended: boolean;
};

export const CommunityPostDetailPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetUserInfo();

  const communityPostDetailQueryKey = 'communityPostDetail';

  const handleLike = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/recommend/${id}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setIsLiked(true);
      } else {
        throw new Error('Failed to recommend the post.');
      }
    } catch (error) {
      console.error('Error recommending the post:', error);
      alert('추천 처리 중 오류가 발생했습니다.');
    }
  };

  const handleUnlike = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/recommend/cancel/${id}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setIsLiked(false);
      } else {
        throw new Error('Failed to cancel the recommendation.');
      }
    } catch (error) {
      console.error('Error cancelling the recommendation:', error);
      alert('추천 취소 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${id}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ content: commentText }),
    });

    if (response.ok) {
      setCommentText('');
    } else {
      console.error('Failed to submit comment', await response.text());
    }
  };

  const fetchCommunityPostDetail = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();

    return data;
  };

  const { data: communityPostDetail, isLoading } = useQuery<Post>({
    queryKey: [communityPostDetailQueryKey, id],
    queryFn: fetchCommunityPostDetail,
    enabled: !!id,
  });

  useEffect(() => {
    if (communityPostDetail?.recommended) {
      setIsLiked(true);
    }
  }, [communityPostDetail?.recommended]);

  if (isLoading || !communityPostDetail) return <div>Loading...</div>;

  const { title, content, thumbnail, region, author, comments, createdAt, recommendCount, views } = communityPostDetail;

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
            <S.HeaderDate>{author?.nickname}</S.HeaderDate>
            <S.HeaderDate>{new Date(createdAt).toLocaleDateString()}</S.HeaderDate>
          </S.HeaderSpanWrapper>
        </S.HeaderTitleBox>

        <S.CommunityStatusBox>
          <S.FlexBox>
            <S.StatusText>댓글 {comments.length}</S.StatusText>
            <S.Divider />
            <S.StatusText>추천 {recommendCount}</S.StatusText>
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
          {thumbnail && (
            <>
              <S.ContentImageWrapper>
                <Image src={thumbnail} alt='thumbnail' objectFit='contain' fill />
              </S.ContentImageWrapper>
            </>
          )}
          <S.ContentsParagraph>{content}</S.ContentsParagraph>
        </S.Contents>

        <S.RecommendButtonBox>
          {isLiked ? (
            <S.LikeButton type='button' onClick={handleUnlike}>
              <S.LikeIconWrapper>
                <Image src='/images/icon/like-icon-hover.svg' alt='like-icon' fill />
              </S.LikeIconWrapper>
              추천취소
            </S.LikeButton>
          ) : (
            <S.UnlikeButton type='button' onClick={handleLike}>
              <S.LikeIconWrapper>
                <Image src='/images/icon/like-icon-default.svg' alt='like-icon' fill />
              </S.LikeIconWrapper>
              추천하기
            </S.UnlikeButton>
          )}
        </S.RecommendButtonBox>
      </S.ContentsArea>

      {/* 댓글 입력 컴포넌트 */}
      <S.CommentArea>
        <S.ComentBox>
          <S.ProfileImageWrapper>
            {data?.profileImage && <Image src={data?.profileImage} alt='my profile image' fill />}
          </S.ProfileImageWrapper>
          <S.ComentPostBox onSubmit={handleCommentSubmit}>
            <S.ComentTextareaBox>
              <S.ProfileNickname>{data?.nickname}</S.ProfileNickname>
              <S.ComentTextarea
                placeholder='댓글을 입력해주세요.'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </S.ComentTextareaBox>
            <S.ComentPostButtonWrapper>
              <S.ComentPostButton type='submit'>댓글 등록하기</S.ComentPostButton>
            </S.ComentPostButtonWrapper>
          </S.ComentPostBox>
        </S.ComentBox>

        {/* 댓글 컴포넌트 */}
        {comments?.length > 0 &&
          comments.map((comment) => (
            <S.ComentBox key={comment.id}>
              {/* <S.ProfileImageWrapper>
                <Image src={comment.author.profileImage} alt='profile-image' fill />
              </S.ProfileImageWrapper> */}
              <S.ComentPostBox>
                <S.ComentTextareaBox>
                  <S.ProfileNickname>{comment.author.nickname}</S.ProfileNickname>
                  <S.PostDateText>{new Date(comment.createdAt).toLocaleDateString()}</S.PostDateText>
                  <S.Coment>{comment.content}</S.Coment>
                </S.ComentTextareaBox>
                <S.EmptySpace />

                {/* 대댓글 컴포넌트 */}
                {comment.replies.length > 0 &&
                  comment.replies.map((reply) => (
                    <>
                      <S.ReplyWrapper>
                        {/* <S.ProfileImageWrapper>
                          <Image src={reply.author.profileImage} alt='reply-profile-image' fill />
                        </S.ProfileImageWrapper> */}
                        <S.ComentPostBox>
                          {/* <S.ProfileNickname>{reply.author.nickname}</S.ProfileNickname>
                          <S.PostDateText>{new Date(reply.createdAt).toLocaleDateString()}</S.PostDateText> */}
                          <S.Coment>{reply}</S.Coment>
                        </S.ComentPostBox>
                      </S.ReplyWrapper>
                      <S.EmptySpace />
                    </>
                  ))}

                {/* 대댓글 입력 컴포넌트 */}
                <S.ReplyWrapper>
                  <S.ProfileImageWrapper>
                    {data?.profileImage && <Image src={data?.profileImage} alt='my profile image' fill />}
                  </S.ProfileImageWrapper>
                  <S.ComentPostBox>
                    <S.ProfileNickname>{data?.nickname}</S.ProfileNickname>
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
