import { getMyProductListParams, MyProductListEntity } from './dto';
import { clientWithTokenApi } from '../instance';

export const getMyProductList = async ({ page, size, type }: getMyProductListParams) => {
  const response = await clientWithTokenApi.get<MyProductListEntity>(
    `/api/product/my-product?page=${page}&size=${size}&type=${type}`,
  );

  return response.data;
};
