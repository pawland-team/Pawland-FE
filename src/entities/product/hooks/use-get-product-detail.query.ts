import { useQuery } from '@tanstack/react-query';

import { productDetailQuery } from '../../product-detail/apis';

export const useGetProductDetail = (id: number) => {
  return useQuery({ ...productDetailQuery.productDetail(id) });
};
