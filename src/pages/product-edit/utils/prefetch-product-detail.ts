import { QueryClient } from '@tanstack/react-query';

import { productQuery } from '@entities/product/apis';

interface PrefetchProductDetailParam {
  queryClient: QueryClient;
  productId: number;
}

export const prefetchProductDetail = async ({ queryClient, productId }: PrefetchProductDetailParam) => {
  await queryClient.prefetchQuery({ ...productQuery.productDetail(productId) });
};
