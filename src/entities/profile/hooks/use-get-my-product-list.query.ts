import { useQuery } from '@tanstack/react-query';

import { myProductQuery } from '../apis';
import { getMyProductListParams } from '@shared/apis/profile-api';

export const useGetmyProductList = ({ page, size, type }: getMyProductListParams) => {
  return useQuery({ ...myProductQuery.myProductList({ page, size, type }) });
};
