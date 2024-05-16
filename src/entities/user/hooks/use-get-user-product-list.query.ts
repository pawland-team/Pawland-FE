import { useQuery } from '@tanstack/react-query';

import { getUserProductListParams } from '@shared/apis/user-api/dto';

import { userProductQuery } from '../apis';

export const useGetUserProductList = ({ size, userId }: getUserProductListParams) => {
  return useQuery({ ...userProductQuery.userProductList({ size, userId }) });
};
