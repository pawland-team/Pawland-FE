import { rest } from 'msw';

import { CommunityPostDetailEntity } from './dto';

const mockCommunityPostDetail: CommunityPostDetailEntity[] = [
  {
    id: 0,
    title: '내가 만든 쿠키',
    content: '테스트',
    imageThumbnail: 'https://image.xportsnews.com/contents/images/upload/article/2023/0406/mb_1680732112382330.jpg',
    region: '서울',
    views: 942,
    createdAt: '2024-03-17T07:00:00.000Z',
    author: {
      id: 1,
      nickname: '캡틴이치돌',
    },
    recommendationCount: 1,
    commentsCount: 1,
    comments: [
      {
        id: 0,
        content: '님 뭐함요?',
        createdAt: '2024-03-17T07:00:00.000Z',
        author: {
          id: 2,
          nickname: '바람이',
          profileImage:
            'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/942e14c8-c3b8-4b81-805e-e21259442d27.jpg',
        },
        reply: [
          {
            id: null,
            content: '',
            createdAt: '',
            author: {
              id: null,
              nickname: '',
              profileImage: '',
            },
          },
        ],
      },
    ],
  },

  {
    id: 2,
    title: '너를 위해 구웠지',
    content: '테스트22222222222222',
    imageThumbnail:
      'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/942e14c8-c3b8-4b81-805e-e21259442d27.jpg',
    region: '부산',
    views: 2,
    createdAt: '2024-04-17T07:00:00.000Z',
    author: {
      id: 2,
      nickname: '바람이',
    },
    recommendationCount: 2,
    commentsCount: 2,
    comments: [
      {
        id: 3,
        content: 'ㅋㅋ 안녕하세요?',
        createdAt: '2024-04-17T07:00:00.000Z',
        author: {
          id: 2,
          nickname: '바람이',
          profileImage:
            'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/942e14c8-c3b8-4b81-805e-e21259442d27.jpg',
        },
        reply: [
          {
            id: null,
            content: '',
            createdAt: '',
            author: {
              id: null,
              nickname: '',
              profileImage: '',
            },
          },
        ],
      },

      {
        id: 4,
        content: '하지마십쇼. 경고드립니다.',
        createdAt: '2024-04-18T07:00:00.000Z',
        author: {
          id: 3,
          nickname: '뉴진스혜인',
          profileImage:
            'https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/nn/2022/08/12/202208120935035510_1.jpg',
        },
        reply: [
          {
            id: null,
            content: '',
            createdAt: '',
            author: {
              id: null,
              nickname: '',
              profileImage: '',
            },
          },
        ],
      },
    ],
  },
];

export const CommunityPostDetailHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/post-detail/:id`, (req, res, ctx) => {
    const { id } = req.params;

    // 배열에서 일치하는 ID 찾기
    const postDetail = mockCommunityPostDetail.find((post) => post.id === Number(id));

    if (postDetail) {
      return res(ctx.status(200), ctx.json(postDetail));
    }

    // 일치하는 데이터가 없을 경우 404 응답
    return res(ctx.status(404), ctx.json({ error: 'Post not found' }));
  }),
];
