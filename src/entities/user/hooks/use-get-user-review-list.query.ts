import { useQuery } from '@tanstack/react-query';

import { userReviewQuery } from '../apis';
import { getUserReviewListParams } from '@shared/apis/user-api/dto';

export const useGetUserReviewList = ({ page, size, userId }: getUserReviewListParams) => {
  return useQuery({ ...userReviewQuery.userReviewList({ page, size, userId }) });
};
