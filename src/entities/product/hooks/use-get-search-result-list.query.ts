import { useQuery } from '@tanstack/react-query';

import { productQuery } from '../apis';

export const useGetMainProductList = (size: number) => {
  return useQuery({ ...productQuery.mainList(size) });
};
