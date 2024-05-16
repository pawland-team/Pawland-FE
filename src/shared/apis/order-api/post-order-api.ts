import { PostOrderResponse } from './dto';
import { clientWithTokenApi } from '../instance';
import { ProductInfoEntity } from '../product-api';

export const postOrder = async (productId: ProductInfoEntity['id']) => {
  const response = await clientWithTokenApi.post<PostOrderResponse>(`/api/order/${productId}`);

  return response.data.id;
};
