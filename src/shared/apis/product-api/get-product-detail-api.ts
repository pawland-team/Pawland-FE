import { ProductInfoEntity } from './dto';
import { clientWithTokenApi } from '../instance';

export const getProductDetail = async (id: number) => {
  const response = await clientWithTokenApi.get<ProductInfoEntity>(`/api/product/${id}`);

  return response.data;
};
