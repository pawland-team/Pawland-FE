import { MyProductListEntity } from './dto';
import { clientWithTokenApi } from '../instance';

export const getMyWishList = async () => {
  const response = await clientWithTokenApi.get<MyProductListEntity>(`/api/product/my-wish-product`);

  return response.data;
};
