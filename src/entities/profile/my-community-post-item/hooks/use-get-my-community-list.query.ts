import { useQuery } from '@tanstack/react-query';

import { myCommunityQuery } from '../apis';

export const useGetmyCommunityList = (page: number) => {
  return useQuery({ ...myCommunityQuery.myCommunityList(page) });
};
