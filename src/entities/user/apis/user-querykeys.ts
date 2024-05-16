import { queryOptions } from '@tanstack/react-query';

import { getUserInfo } from '@shared/apis/user-api';

import { getOtherUserInfo } from '@shared/apis/user-api/get-other-user-info-api';
import {
  getUserCommunityListParams,
  getUserProductListParams,
  getUserReviewListParams,
} from '@shared/apis/user-api/dto';
import { getUserProductList } from '@shared/apis/user-api/get-user-product-list-api';
import { getUserCommunityList } from '@shared/apis/user-api/get-user-community-list-api';
import { getUserReviewList } from '@shared/apis/user-api/get-user-review-list-api';

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
  userProductList: ({ size, userId }: getUserProductListParams) => [...userProductQueryKeys.all(), { size, userId }],
};

export const userProductQuery = {
  all: () =>
    queryOptions({
      queryKey: userProductQueryKeys.all(),
    }),

  userProductList: ({ size, userId }: getUserProductListParams) =>
    queryOptions({
      queryKey: userProductQueryKeys.userProductList({ size, userId }),
      queryFn: () => getUserProductList({ size, userId }),
      staleTime: 3 * 60 * 1000,
    }),
};

export const userCommunityQueryKeys = {
  all: () => ['userCommunityList'],
  userCommunityList: ({ page, userId }: getUserCommunityListParams) => [
    ...userCommunityQueryKeys.all(),
    { page, userId },
  ],
};

export const userCommunityQuery = {
  all: () =>
    queryOptions({
      queryKey: userCommunityQueryKeys.all(),
    }),

  userCommunityList: ({ page, userId }: getUserCommunityListParams) =>
    queryOptions({
      queryKey: userCommunityQueryKeys.userCommunityList({ page, userId }),
      queryFn: () => getUserCommunityList({ page, userId }),
      staleTime: 3 * 60 * 1000,
    }),
};

export const userReviewQueryKeys = {
  all: () => ['userReviewList'],
  userReviewList: ({ page, size, userId }: getUserReviewListParams) => [
    ...userReviewQueryKeys.all(),
    { page, size, userId },
  ],
};

export const userReviewQuery = {
  all: () =>
    queryOptions({
      queryKey: userReviewQueryKeys.all(),
    }),

  userReviewList: ({ page, size, userId }: getUserReviewListParams) =>
    queryOptions({
      queryKey: userReviewQueryKeys.userReviewList({ page, size, userId }),
      queryFn: () => getUserReviewList({ page, size, userId }),
      staleTime: 3 * 60 * 1000,
    }),
};
