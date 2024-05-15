import { ProductRegisterRequest, ProductRegisterResponse } from './dto';
import { clientWithTokenApi } from '../instance';

interface EditProductParam {
  productId: number;
  product: ProductRegisterRequest;
}

export const editProduct = async ({ product, productId }: EditProductParam) => {
  const response = await clientWithTokenApi.put<ProductRegisterResponse>(`/api/product/${productId}`, product);

  return response.data;
};
