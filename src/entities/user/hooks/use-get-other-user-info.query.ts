import { useQuery } from '@tanstack/react-query';

import { userQuery } from '../apis';

export const useGetOtherUserInfo = (id: number) => {
  return useQuery({ ...userQuery.user(id) });
};
