import { useQuery } from '@tanstack/react-query';

import { getUserReviewListParams } from '@shared/apis/user-api/dto';

import { userReviewQuery } from '../apis';

export const useGetUserReviewList = ({ page, size, userId }: getUserReviewListParams) => {
  return useQuery({ ...userReviewQuery.userReviewList({ page, size, userId }) });
};
