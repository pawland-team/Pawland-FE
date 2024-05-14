import { queryOptions } from '@tanstack/react-query';

import { getUserInfo } from '@shared/apis/user-api';
import { getOtherUserInfo } from '@shared/apis/user-api/get-other-user-info-api';
import { getUserProductListParams } from '@shared/apis/user-api/dto';
import { getUserProductList } from '@shared/apis/user-api/get-user-product-list-api';

export const userQueryKeys = {
  all: () => ['user'],
  user: (id: number) => [...userQueryKeys.all(), id],
};

export const userQuery = {
  all: () =>
    queryOptions({
      queryKey: userQueryKeys.all(),
      queryFn: getUserInfo,
      refetchOnMount: true,
      retry: 1,
      // 24시간
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    }),

  user: (id: number) =>
    queryOptions({
      queryKey: userQueryKeys.user(id),
      queryFn: () => getOtherUserInfo(id),
      staleTime: 10 * 60 * 1000, // 10 min
      gcTime: 15 * 60 * 1000, // 15 min
    }),
};

export const userProductQueryKeys = {
  all: () => ['userProductList'],
  userProductList: ({ page, size, userId }: getUserProductListParams) => [
    ...userProductQueryKeys.all(),
    { page, size, userId },
  ],
};

export const userProductQuery = {
  all: () =>
    queryOptions({
      queryKey: userProductQueryKeys.all(),
    }),

  userProductList: ({ page, size, userId }: getUserProductListParams) =>
    queryOptions({
      queryKey: userProductQueryKeys.userProductList({ page, size, userId }),
      queryFn: () => getUserProductList({ page, size, userId }),
      staleTime: 3 * 60 * 1000,
    }),
};
