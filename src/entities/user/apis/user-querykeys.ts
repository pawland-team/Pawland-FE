import { queryOptions } from '@tanstack/react-query';

import { getUserInfo } from '@shared/apis/user-api';
import { getOtherUserInfo } from '@shared/apis/user-api/get-other-user-info-api';

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
