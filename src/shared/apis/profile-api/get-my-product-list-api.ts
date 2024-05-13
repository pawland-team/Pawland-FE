import { MyProductListEntity, getMyProductListParams } from './dto';
import { clientWithTokenApi } from '../instance';

export const getMyProductList = async ({ page, size }: getMyProductListParams) => {
  const response = await clientWithTokenApi.get<MyProductListEntity>(
    `/api/product/my-product?page=${page}&size=${size}`,
  );

  return response.data;
};
