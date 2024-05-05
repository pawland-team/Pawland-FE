import { rest } from 'msw';

import { CommunityPostListEntity } from './dto';

const mockCommunityList: CommunityPostListEntity[] = [
  {
    id: 0,
    imageThumbnail: 'string',
    title: '테스트 제목 1',
    commentCount: 1,
    recommendationCount: 1,
    views: 1,
    createdAt: '2022-03-17T07:00:00.000Z',
    region: '서울',
    writerInfo: {
      id: 1,
      nickname: '테스트 닉네임 1',
    },
  },
  {
    id: 1,
    imageThumbnail: 'string',
    title: '테스트 제목 2',
    commentCount: 2,
    recommendationCount: 2,
    views: 2,
    createdAt: '2022-03-17T07:00:00.000Z',
    region: '부산',
    writerInfo: {
      id: 2,
      nickname: '테스트 닉네임 2',
    },
  },
  {
    id: 2,
    imageThumbnail: 'string',
    title: '테스트 제목 3',
    commentCount: 3,
    recommendationCount: 3,
    views: 3,
    createdAt: '2022-03-17T07:00:00.000Z',
    region: '대구',
    writerInfo: {
      id: 3,
      nickname: '테스트 닉네임 3',
    },
  },
];

export const CommunityListHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/list`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCommunityList));
  }),
];
