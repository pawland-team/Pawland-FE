import { useQuery } from '@tanstack/react-query';

import { myWishListQuery } from '../apis';

export const useGetMyWishList = () => {
  return useQuery({ ...myWishListQuery.myWishList() });
};
