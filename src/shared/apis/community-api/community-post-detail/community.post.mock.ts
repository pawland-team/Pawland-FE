import { rest } from 'msw';

import { CommunityPostDetailEntity } from './dto';

const mockCommunityPostDetail: CommunityPostDetailEntity = {
  id: 0,
  title: '내가 만든 쿠키',
  content: '테스트',
  imageThumbnail: 'https://image.xportsnews.com/contents/images/upload/article/2023/0406/mb_1680732112382330.jpg',
  region: '서울',
  views: 942,
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
};

export const CommunityPostDetailHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/list`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCommunityPostDetail));
  }),
];
