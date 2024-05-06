import { ProductInfoEntity } from './dto';
import { clientApi } from '../instance';

export const getProductDetail = async (id: number) => {
  const response = await clientApi.get<ProductInfoEntity>(`/api/product/${id}`);

  return response.data;
};
