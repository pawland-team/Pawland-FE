import { useQuery } from '@tanstack/react-query';

import { producQuery } from '../apis';

export const useGetMainProductList = (size: number) => {
  return useQuery({ ...producQuery.mainList(size) });
};
