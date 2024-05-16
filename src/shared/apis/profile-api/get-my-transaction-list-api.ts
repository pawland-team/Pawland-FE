import { getMyProductListParams, MyTransactionListEntity } from './dto';
import { clientWithTokenApi } from '../instance';

export const getMyTransactionList = async ({ page, size, type }: getMyProductListParams) => {
  const response = await clientWithTokenApi.get<MyTransactionListEntity>(
    `/api/order/my-order?page=${page}&size=${size}&type=${type}`,
  );

  return response.data;
};
