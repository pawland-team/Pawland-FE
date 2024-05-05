import { rest } from 'msw';

import { CommunityPostListEntity } from './dto';

const mockCommunityList: CommunityPostListEntity[] = [
  {
    id: 0,
    imageThumbnail: 'https://image.xportsnews.com/contents/images/upload/article/2023/0406/mb_1680732112382330.jpg',
    title: '내가 만든 쿠키',
    commentCount: 1,
    recommendationCount: 1,
    views: 942,
    createdAt: '2022-03-17T07:00:00.000Z',
    region: '서울',
    writerInfo: {
      id: 1,
      nickname: '캡틴이치돌',
    },
  },
  {
    id: 1,
    imageThumbnail:
      'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/942e14c8-c3b8-4b81-805e-e21259442d27.jpg',
    title: '너를 위해 구웠지',
    commentCount: 2,
    recommendationCount: 2,
    views: 2,
    createdAt: '2022-03-14T07:00:00.000Z',
    region: '부산',
    writerInfo: {
      id: 2,
      nickname: '바람이',
    },
  },
  {
    id: 2,
    imageThumbnail:
      'https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/nn/2022/08/12/202208120935035510_1.jpg',
    title: 'ㅋㅋ 안녕',
    commentCount: 3,
    recommendationCount: 3,
    views: 32,
    createdAt: '2022-03-16T07:00:00.000Z',
    region: '대구',
    writerInfo: {
      id: 3,
      nickname: '뉴진스혜인',
    },
  },
  {
    id: 3,
    imageThumbnail: 'https://newsimg.sedaily.com/2022/08/26/269Y5GBQBB_1.jpg',
    title: '안녕하세요!',
    commentCount: 4,
    recommendationCount: 4,
    views: 124,
    createdAt: '2022-03-15T07:00:00.000Z',
    region: '인천',
    writerInfo: {
      id: 4,
      nickname: '뉴진스',
    },
  },
  {
    id: 4,
    imageThumbnail: 'https://static.news.zumst.com/images/28/2024/04/10/9676e6e336494198a8d8250fb5e67b20.jpg',
    title: '어텐션',
    commentCount: 5,
    recommendationCount: 5,
    views: 5,
    createdAt: '2022-03-13T07:00:00.000Z',
    region: '광주',
    writerInfo: {
      id: 5,
      nickname: '세상에서젤이쁜',
    },
  },
  {
    id: 5,
    imageThumbnail:
      'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2023/02/16/9f293a38-8e6e-4866-80cb-0b978a96cb42.jpg',
    title: '오마오마갓',
    commentCount: 6,
    recommendationCount: 6,
    views: 512,
    createdAt: '2022-03-12T07:00:00.000Z',
    region: '대전',
    writerInfo: {
      id: 6,
      nickname: 'OMG',
    },
  },
  {
    id: 6,
    imageThumbnail: 'https://cdn.topstarnews.net/news/photo/202305/15330589_1109372_2425.jpg',
    title: '예상했어난',
    commentCount: 7,
    recommendationCount: 7,
    views: 12124,
    createdAt: '2022-03-11T07:00:00.000Z',
    region: '울산',
    writerInfo: {
      id: 7,
      nickname: '세젤예혜인',
    },
  },
  {
    id: 7,
    imageThumbnail:
      'https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/pt/2022/08/05/202208051002776607_62ec6ce08abd8.jpg',
    title: '뉴진스하면 혜인이지',
    commentCount: 8,
    recommendationCount: 8,
    views: 8,
    createdAt: '2022-03-10T07:00:00.000Z',
    region: '세종',
    writerInfo: {
      id: 8,
      nickname: '인정?',
    },
  },
];

export const CommunityListHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/list`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCommunityList));
  }),
];
