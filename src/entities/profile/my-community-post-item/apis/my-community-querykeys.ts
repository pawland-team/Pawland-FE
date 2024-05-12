import { getMyCommunityList } from '@shared/apis/my-community-api';
import { queryOptions } from '@tanstack/react-query';

export const myCommunityQueryKeys = {
  all: () => ['myCommunityList'],
  myCommunityList: (page: number) => [...myCommunityQueryKeys.all(), page],
};

export const myCommunityQuery = {
  all: () =>
    queryOptions({
      queryKey: myCommunityQueryKeys.all(),
    }),

  myCommunityList: (page: number) =>
    queryOptions({
      queryKey: myCommunityQueryKeys.myCommunityList(page),
      queryFn: () => getMyCommunityList(page),
      staleTime: 3 * 60 * 1000,
    }),
};
