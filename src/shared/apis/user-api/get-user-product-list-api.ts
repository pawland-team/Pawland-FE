import { getUserProductListParams } from './dto';
import { clientWithTokenApi } from '../instance';
import { MyProductListEntity } from '../profile-api';

export const getUserProductList = async ({ size, userId }: getUserProductListParams) => {
  const response = await clientWithTokenApi.get<MyProductListEntity>(`/api/product/user/${userId}?page=1&size=${size}`);

  return response.data;
};
