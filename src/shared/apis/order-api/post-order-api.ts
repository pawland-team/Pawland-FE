import { isAxiosError } from 'axios';

import { PostOrderResponse } from './dto';
import { clientWithTokenApi } from '../instance';
import { ProductInfoEntity } from '../product-api';

export const postOrder = async (productId: ProductInfoEntity['id']) => {
  try {
    const response = await clientWithTokenApi.post<PostOrderResponse>(`/api/order/${productId}`);

    return response.data.id;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 302) {
      console.log(1);
      throw error;
    }
  }
};
