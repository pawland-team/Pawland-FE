import { useQuery } from '@tanstack/react-query';

import { productQuery } from '../apis';

export const useGetProductDetail = (id: number) => {
  return useQuery({ ...productQuery.productDetail(id) });
};
