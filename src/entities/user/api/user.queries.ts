import { queryOptions } from '@tanstack/react-query';

import { getCurrentUserProfileApi, getUserProfileApi } from '@shared/api/user-api';

export const userQueryKeys = {
  all: () => ['user'],
  currentUserProfile: () => [...userQueryKeys.all(), 'current-user'],
  userProfile: (userId: number) => [...userQueryKeys.all(), userId],
};

export const userQuery = {
  all: () =>
    queryOptions({
      queryKey: userQueryKeys.all(),
    }),

  currentUserProfile: () =>
    queryOptions({
      queryKey: userQueryKeys.currentUserProfile(),
      queryFn: getCurrentUserProfileApi,
    }),

  userProfile: (userId: number) =>
    queryOptions({
      queryKey: userQueryKeys.userProfile(userId),
      queryFn: () => getUserProfileApi(userId),
    }),
};
