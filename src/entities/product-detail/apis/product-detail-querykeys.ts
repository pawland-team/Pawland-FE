import { queryOptions } from '@tanstack/react-query';

import { getProductDetail } from '@shared/apis/product-api';

export const productDetailQueryKeys = {
  all: () => ['productDetail'],
  productDetail: (id: number) => [...productDetailQueryKeys.all(), id],
};

export const productDetailQuery = {
  all: () =>
    queryOptions({
      queryKey: productDetailQueryKeys.all(),
    }),

  productDetail: (id: number) =>
    queryOptions({
      queryKey: productDetailQueryKeys.productDetail(id),
      queryFn: () => getProductDetail(id),
    }),
};
