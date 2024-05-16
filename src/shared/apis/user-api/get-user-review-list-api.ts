import { clientWithTokenApi } from '../instance';
import { UserReviewListEntity, getUserReviewListParams } from './dto';

export const getUserReviewList = async ({ page, size, userId }: getUserReviewListParams) => {
  const response = await clientWithTokenApi.get<UserReviewListEntity>(
    `/api/review/${userId}?page=${page}&size=${size}`,
  );

  return response.data;
};
