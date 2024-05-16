import { useQuery } from '@tanstack/react-query';

import { myWishListQuery } from '../apis';
import { getMyWishListParams } from '@shared/apis/profile-api';

export const useGetMyWishList = ({ page }: getMyWishListParams) => {
  return useQuery({ ...myWishListQuery.myWishList({ page }) });
};
