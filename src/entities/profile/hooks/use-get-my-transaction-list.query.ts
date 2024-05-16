import { useQuery } from '@tanstack/react-query';

import { getMyProductListParams } from '@shared/apis/profile-api';

import { myTransactionQuery } from '../apis';

export const useGetmyTransactionList = ({ page, size, type }: getMyProductListParams) => {
  return useQuery({ ...myTransactionQuery.myTransactionList({ page, size, type }) });
};
