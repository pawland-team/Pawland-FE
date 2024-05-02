import { useQuery } from '@tanstack/react-query';

import { userQuery } from '../apis';

export const useGetUserInfo = () => {
  return useQuery({ ...userQuery.all() });
};
