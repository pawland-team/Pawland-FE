import { useQuery } from '@tanstack/react-query';

import { getMyProductListParams } from '@shared/apis/profile-api';

import { myProductQuery } from '../apis';

export const useGetmyProductList = ({ page, size, type }: getMyProductListParams) => {
  return useQuery({ ...myProductQuery.myProductList({ page, size, type }) });
};
