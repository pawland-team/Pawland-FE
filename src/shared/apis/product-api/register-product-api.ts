import { ProductRegisterRequest, ProductRegisterResponse } from './dto';
import { clientWithTokenApi } from '../instance';

// 200 성공
// 400 입력 값 오류
// {
//   message: string;
// }
// 500 상품 등록 실패
// {
//   message: string;
// }

export const registerProduct = async (product: ProductRegisterRequest) => {
  const response = await clientWithTokenApi.post<ProductRegisterResponse>('/api/product', product, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
