import { queryOptions } from '@tanstack/react-query';

import { getMyCommunityList, getMyProductList, getMyProductListParams, getMyWishList } from '@shared/apis/profile-api';
import { getMyTransactionList } from '@shared/apis/profile-api/get-my-transaction-list-api';

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

export const myProductQueryKeys = {
  all: () => ['myProductList'],
  myProductList: ({ page, size, type }: getMyProductListParams) => [...myProductQueryKeys.all(), { page, size, type }],
};

export const myProductQuery = {
  all: () =>
    queryOptions({
      queryKey: myProductQueryKeys.all(),
    }),

  myProductList: ({ page, size, type }: getMyProductListParams) =>
    queryOptions({
      queryKey: myProductQueryKeys.myProductList({ page, size, type }),
      queryFn: () => getMyProductList({ page, size, type }),
      staleTime: 3 * 60 * 1000,
    }),
};

export const myWishListQueryKeys = {
  all: () => ['myWishList'],
  myWishList: () => [...myProductQueryKeys.all()],
};

export const myWishListQuery = {
  all: () =>
    queryOptions({
      queryKey: myWishListQueryKeys.all(),
    }),

  myWishList: () =>
    queryOptions({
      queryKey: myWishListQueryKeys.myWishList(),
      queryFn: () => getMyWishList(),
      staleTime: 3 * 60 * 1000,
    }),
};

export const myTransactionQueryKeys = {
  all: () => ['myTransactionList'],
  myTransactionList: ({ page, size, type }: getMyProductListParams) => [
    ...myTransactionQueryKeys.all(),
    { page, size, type },
  ],
};

export const myTransactionQuery = {
  all: () =>
    queryOptions({
      queryKey: myTransactionQueryKeys.all(),
    }),

  myTransactionList: ({ page, size, type }: getMyProductListParams) =>
    queryOptions({
      queryKey: myTransactionQueryKeys.myTransactionList({ page, size, type }),
      queryFn: () => getMyTransactionList({ page, size, type }),
      staleTime: 3 * 60 * 1000,
    }),
};
