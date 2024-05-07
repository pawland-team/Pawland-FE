import { queryOptions } from '@tanstack/react-query';

import { getMainProductList } from '@shared/apis/main-list-api';

export const productListQueryKeys = {
  all: () => ['productList'],
  mainList: (size: number) => [...productListQueryKeys.all(), size],
};

export const productListQuery = {
  all: () =>
    queryOptions({
      queryKey: productListQueryKeys.all(),
    }),

  mainList: (size: number) =>
    queryOptions({
      queryKey: productListQueryKeys.mainList(size),
      queryFn: () => getMainProductList(size),
    }),
};
