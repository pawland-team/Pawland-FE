import { queryOptions } from '@tanstack/react-query';

import { getUserInfo } from '@shared/apis/user-api';

export const userQueryKeys = {
  all: () => ['user'],
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
};
