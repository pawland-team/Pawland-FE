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
    }),
};
