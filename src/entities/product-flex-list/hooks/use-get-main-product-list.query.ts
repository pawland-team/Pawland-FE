import { useQuery } from '@tanstack/react-query';

import { productListQuery } from '../apis';

export const useGetMainProductList = (size: number) => {
  return useQuery({ ...productListQuery.mainList(size) });
};
