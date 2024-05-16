import { useQuery } from '@tanstack/react-query';

import { myCommunityQuery } from '../apis';
import { getMyCommunityListParams } from '@shared/apis/profile-api';

export const useGetmyCommunityList = ({ page }: getMyCommunityListParams) => {
  return useQuery({ ...myCommunityQuery.myCommunityList({ page }) });
};
