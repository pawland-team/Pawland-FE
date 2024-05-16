import { useQuery } from '@tanstack/react-query';

import { getMyWishListParams } from '@shared/apis/profile-api';

import { myWishListQuery } from '../apis';

export const useGetMyWishList = ({ page }: getMyWishListParams) => {
  return useQuery({ ...myWishListQuery.myWishList({ page }) });
};
