import { useQuery } from '@tanstack/react-query';

import { userProductQuery } from '../apis';
import { getUserProductListParams } from '@shared/apis/user-api/dto';

export const useGetUserProductList = ({ size, userId }: getUserProductListParams) => {
  return useQuery({ ...userProductQuery.userProductList({ size, userId }) });
};
