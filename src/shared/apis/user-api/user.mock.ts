import { rest } from 'msw';

import { UserEntity } from './dto';

const mockUserInfo: UserEntity = {
  email: 'asfd@gmail.com',
  profileImage:
    'https://mblogthumb-phinf.pstatic.net/MjAyMzExMDRfMzIg/MDAxNjk5MDg2MzgwMjUy.lJyAk6Jbofs0JCpCTJ_0i083P10f11VJO13QJC_Fo30g.nQQBaD5VI1MAuSRGSlRfN02Xt5Tj_ZcJmTIdO5NHpBQg.JPEG.ghkdwjdtka/download.jpg?type=w800',
  id: 1,
  nickname: '테스트',
  stars: 3.5,
  userIntroduce: '안녕하세요',
  loginType: '일반',
};

// @see https://fe-developers.kakaoent.com/2022/220317-integrate-msw-storybook-jest/
export const userHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/my-info`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserInfo));
  }),
];

/**
 * 액세스 토큰이 없는 경우
 *
 * 만약 무한 로딩을 구현하고 싶다면 아래 링크를 참고하자
 * @see https://github.com/storybookjs/storybook/issues/12489#issuecomment-1362852435
 */
export const userHandlersError = [
  rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/my-info`, (_req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
  }),
];
