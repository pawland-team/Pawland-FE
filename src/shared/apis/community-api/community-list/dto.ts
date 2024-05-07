type Region =
  | '서울'
  | '부산'
  | '대구'
  | '인천'
  | '광주'
  | '대전'
  | '울산'
  | '세종'
  | '경기'
  | '강원'
  | '충북'
  | '충남'
  | '전북'
  | '전남'
  | '경북'
  | '경남'
  | '제주'
  | '해외';

export interface CommunityPostListEntity {
  id: number; // 해당 게시글 id
  imageThumbnail: string; // 썸네일 이미지
  title: string; // 게시글 제목
  commentCount: number; // 댓글 수
  recommendationCount: number; // 추천 수
  views: number; // 조회수
  createdAt: string; // 게시글 업로드 날짜
  region: Region; // 지역
  writerInfo: {
    id: number; // userId (작성자 id)
    nickname: string; // 닉네임
  };
}

export interface CommunityEntity {
  totalPages: 0;
  totalElements: 0;
  size: 0;
  content: [
    {
      id: 0;
      title: 'string';
      content: 'string';
      thumbnail: 'string';
      region: 'string';
      views: 0;
      author: {
        id: 0;
        email: 'string';
        nickname: 'string';
      };
      comments: [
        {
          id: 0;
          author: {
            id: 0;
            email: 'string';
            nickname: 'string';
          };
          content: 'string';
          replies: ['string'];
          recommendCount: 0;
        },
      ];
    },
  ];
  number: 0;
  sort: {
    empty: true;
    sorted: true;
    unsorted: true;
  };
  numberOfElements: 0;
  pageable: {
    offset: 0;
    sort: {
      empty: true;
      sorted: true;
      unsorted: true;
    };
    pageSize: 0;
    paged: true;
    pageNumber: 0;
    unpaged: true;
  };
  first: true;
  last: true;
  empty: true;
}
