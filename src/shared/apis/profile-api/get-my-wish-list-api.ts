import { MyWishListEntity, getMyWishListParams } from './dto';
import { clientWithTokenApi } from '../instance';

export const getMyWishList = async ({ page }: getMyWishListParams) => {
  const response = await clientWithTokenApi.get<MyWishListEntity>(`/api/product/my-wish-product?page=${page}&size=6`);

  return response.data;
};
