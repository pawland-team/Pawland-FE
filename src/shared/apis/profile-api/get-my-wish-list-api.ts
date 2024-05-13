import { MyWishListEntity } from './dto';
import { clientWithTokenApi } from '../instance';

export const getMyWishList = async () => {
  const response = await clientWithTokenApi.get<MyWishListEntity>(`/api/product/my-wish-product`);

  return response.data;
};
