export interface CommunityPostDetailEntity {
  id: number; // 해당 게시글 id
  title: string; // 게시글 제목
  content: string; // 게시글 내용
  imageThumbnail: string; // 썸네일 이미지
  region: string; // 지역
  views: number; // 조회수
  author: {
    id: number; // userId (작성자 id)
    nickname: string; // 닉네임
  };
  recommendationCount: number; // 추천 수
  commentsCount: number; // 댓글 수
  comments: {
    id: number | null; // 댓글 id
    content: string; // 댓글 내용
    createdAt: string; // 댓글 작성 날짜
    author: {
      id: number | null; // userId (작성자 id)
      nickname: string; // 닉네임
      profileImage: string; // 프로필 이미지
    };
    reply: {
      id: number | null; // 대댓글 id
      content: string; // 대댓글 내용
      createdAt: string; // 대댓글 작성 날짜
      author: {
        id: number | null; // userId (작성자 id)
        nickname: string; // 닉네임
        profileImage: string; // 프로필 이미지
      };
    }[];
  }[];
}
