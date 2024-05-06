import { useQuery } from '@tanstack/react-query';

import { productDetailQuery } from '../apis';

export const useGetProductDetail = (id: number) => {
  return useQuery({ ...productDetailQuery.productDetail(id) });
};
