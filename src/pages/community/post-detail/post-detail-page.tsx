import { FormEvent, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetUserInfo } from '@entities/user/hooks';
import { useModalList } from '@shared/hooks/use-modal';
import { PostModal } from '@shared/ui/modal/post-modal';

import * as S from './post-detail-page-style';

type Author = {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  star?: number;
  reviewCount?: number;
};

type Replies = {
  id: number;
  author: Author;
  content: string;
  createdAt: string;
};

type Comment = {
  id: number;
  author: Author;
  content: string;
  replies: Replies[];
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

// 댓글, 답글 엔터로도 입력되게 해야됨
// 게시글 삭제, 수정 기능 구현해야됨
// 답글 수정, 삭제 기능은 아직 백엔드 미구현임

export const CommunityPostDetailPage = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTexts, setReplyTexts] = useState<{ [key: number]: string }>({});
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data: userData } = useGetUserInfo();
  const { openModalList } = useModalList();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState<string>('');

  const startEditingComment = (commentId: number, currentText: string) => {
    setEditingCommentId(commentId);
    setEditingCommentText(currentText);
  };

  const cancelEditingComment = () => {
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  const handleEditCommentButtonClick = (commentId: number, currentText: string) => {
    startEditingComment(commentId, currentText);
  };

  const handleCommentEditSubmit = async (commentId: number) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${commentId}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editingCommentText }),
        credentials: 'include',
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? { ...comment, content: updatedComment.content } : comment,
          ),
        );
        cancelEditingComment();
      } else {
        throw new Error('Failed to edit comment');
      }
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const communityPostDetailQueryKey = 'communityPostDetail';

  const calculateTotalComments = (comments: Comment[]) => {
    return comments?.reduce((total, comment) => {
      return total + 1 + comment.replies.length;
    }, 0);
  };

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
      openModalList({
        ModalComponent: PostModal,
        modalKey: ['recommend-modal'],
        props: {
          content: '추천 처리 중 오류가 발생했습니다.',
        },
      });
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
      openModalList({
        ModalComponent: PostModal,
        modalKey: ['recommend-modal'],
        props: {
          content: '추천 취소 처리 중 오류가 발생했습니다.',
        },
      });
    }
  };

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/post/${id}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ content: commentText }),
    });

    if (response.ok) {
      const newComment = await response.json();
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText('');
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      console.error('Failed to submit comment', await response.text());
    }
  };

  const handleReplyChange = (commentId: number, text: string) => {
    setReplyTexts((prev) => ({
      ...prev,
      [commentId]: text,
    }));
  };

  const handleDeleteComment = async (commentId: number) => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm('정말로 이 댓글을 삭제하시겠습니까?');

    if (!isConfirmed) {
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${commentId}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      } else {
        throw new Error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const submitReply = async (event: FormEvent<HTMLFormElement>, commentId: number) => {
    event.preventDefault();
    const replyContent = replyTexts[commentId];

    if (!replyContent) return;

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${commentId}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content: replyContent }),
      });

      if (response.ok) {
        const newReply = await response.json();

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment,
          ),
        );
        setReplyTexts((prev) => ({
          ...prev,
          [commentId]: '',
        }));
      } else {
        throw new Error('Failed to submit reply');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
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

  const handleDeletePost = async () => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm('정말로 이 게시물을 삭제하시겠습니까?');

    if (!isConfirmed) {
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        openModalList({
          ModalComponent: PostModal,
          modalKey: ['delete-modal'],
          props: {
            content: '게시글 삭제가 완료되었습니다.',
            onClose: () => {
              router.push('/community/list');
            },
          },
        });
      } else {
        throw new Error('Failed to delete the post.');
      }
    } catch (error) {
      console.error('Error deleting the post:', error);
      openModalList({
        ModalComponent: PostModal,
        modalKey: ['delete-modal'],
        props: {
          content: '게시글 삭제 중 오류가 발생했습니다.',
        },
      });
    }
  };

  useEffect(() => {
    if (communityPostDetail?.recommended) {
      setIsLiked(true);
    }
  }, [communityPostDetail?.recommended]);

  useEffect(() => {
    if (communityPostDetail) {
      setComments(communityPostDetail.comments);
    }
  }, [communityPostDetail]);

  if (isLoading || !communityPostDetail) return <div>Loading...</div>;

  const { title, content, region, author, createdAt, recommendCount, views } = communityPostDetail;
  const totalComments = calculateTotalComments(comments);
  const htmlContent = content?.replace(/\n/g, '<br />');

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
            <S.StatusText>댓글 {totalComments}</S.StatusText>
            <S.Divider />
            <S.StatusText>추천 {recommendCount}</S.StatusText>
            <S.Divider />
            <S.StatusText>조회수 {views}</S.StatusText>
          </S.FlexBox>

          <S.EditBox>
            {author?.id === userData?.id && (
              <>
                <Link href={`/community/post-edit/${id}`}>
                  <S.PostFunctionBox>
                    <Image src='/images/icon/edit-icon.svg' alt='edit-icon' width={20} height={20} />
                    <S.PostFunctionButton type='button'>수정하기</S.PostFunctionButton>
                  </S.PostFunctionBox>
                </Link>

                <S.PostFunctionBox>
                  <Image src='/images/icon/delete-icon.svg' alt='edit-icon' width={20} height={20} />
                  <S.PostFunctionButton type='button' onClick={() => handleDeletePost()}>
                    삭제하기
                  </S.PostFunctionButton>
                </S.PostFunctionBox>
              </>
            )}
          </S.EditBox>
        </S.CommunityStatusBox>
      </S.HeaderArea>

      <S.ContentsArea>
        <S.Contents>
          <S.ContentsParagraph dangerouslySetInnerHTML={{ __html: htmlContent }} />
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
            {userData?.profileImage && <Image src={userData?.profileImage} alt='my profile image' fill />}
          </S.ProfileImageWrapper>
          <S.ComentPostBox onSubmit={handleCommentSubmit}>
            <S.ComentTextareaBox>
              <S.ProfileNickname>{userData?.nickname}</S.ProfileNickname>
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
              <S.ProfileImageWrapper>
                <Image src={comment.author.profileImage} alt='profile-image' fill />
              </S.ProfileImageWrapper>
              <S.ComentPostBox>
                <S.ComentTextareaBox>
                  <S.ComentDeleteWrapper>
                    <S.ProfileNickname>{comment.author.nickname}</S.ProfileNickname>
                    {comment.author.id === userData?.id && (
                      <>
                        {editingCommentId === comment.id ? (
                          <>
                            <button type='button' onClick={cancelEditingComment}>
                              취소
                            </button>
                            <button type='button' onClick={() => handleCommentEditSubmit(comment.id)}>
                              저장
                            </button>
                          </>
                        ) : (
                          <button
                            type='button'
                            onClick={() => handleEditCommentButtonClick(comment.id, comment.content)}
                          >
                            <Image src='/images/icon/edit-icon.svg' alt='edit-icon' width={20} height={20} />
                          </button>
                        )}

                        <S.ComentDeleteButton type='button' onClick={() => handleDeleteComment(comment.id)}>
                          X
                        </S.ComentDeleteButton>
                      </>
                    )}
                  </S.ComentDeleteWrapper>
                  <S.PostDateText>{new Date(comment.createdAt).toLocaleDateString()}</S.PostDateText>
                  {editingCommentId === comment.id ? (
                    <S.ComentTextarea
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                    />
                  ) : (
                    <S.Coment>{comment.content}</S.Coment>
                  )}
                </S.ComentTextareaBox>
                <S.EmptySpace />

                {/* 대댓글 컴포넌트 */}
                {comment.replies.length > 0 &&
                  comment.replies.map((reply) => (
                    <>
                      <S.ReplyWrapper key={reply.id}>
                        <S.ProfileImageWrapper>
                          <Image src={reply.author.profileImage} alt='reply-profile-image' fill />
                        </S.ProfileImageWrapper>
                        <S.ComentPostBox>
                          <S.ProfileNickname>{reply.author.nickname}</S.ProfileNickname>
                          <S.PostDateText>{new Date(reply.createdAt).toLocaleDateString()}</S.PostDateText>
                          <S.Coment>{reply.content}</S.Coment>
                        </S.ComentPostBox>
                      </S.ReplyWrapper>
                      <S.EmptySpace />
                    </>
                  ))}

                {/* 대댓글 입력 컴포넌트 */}
                <S.ReplyWrapper>
                  <S.ProfileImageWrapper>
                    {userData?.profileImage && <Image src={userData?.profileImage} alt='my profile image' fill />}
                  </S.ProfileImageWrapper>
                  <S.ComentPostBox>
                    <S.ReplyForm onClick={(e) => submitReply(e, comment.id)}>
                      <S.ProfileNickname>{userData?.nickname}</S.ProfileNickname>
                      <S.ComentTextarea
                        placeholder='답글을 입력해주세요.'
                        value={replyTexts[comment.id] || ''}
                        onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                      />
                      <S.ComentPostButtonWrapper>
                        <S.ReplyPostButton type='submit'>답글 등록하기</S.ReplyPostButton>
                      </S.ComentPostButtonWrapper>
                    </S.ReplyForm>
                  </S.ComentPostBox>
                </S.ReplyWrapper>
              </S.ComentPostBox>
            </S.ComentBox>
          ))}
      </S.CommentArea>
    </S.PostDetailPage>
  );
};
