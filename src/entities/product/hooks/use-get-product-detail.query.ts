import { useQuery } from '@tanstack/react-query';

import { productQuery } from '../apis';

export const useGetProductDetail = (id: number, retryCount?: number) => {
  return useQuery({ ...productQuery.productDetail(id, retryCount) });
};
