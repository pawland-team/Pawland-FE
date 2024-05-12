import { ProductListDto } from './dto';
import { clientWithTokenApi } from '../instance';
/**
 *
 * main 뿐만 아니라 소팅 없이 첫 페이지+카드 갯수(size)만 지정해서 보여줄 때 사용 가능
 * - page = 1 (수정 불가)
 * - order = 최신순 (수정 불가)
 * - size 지정해야함
 */

export const getProductList = async (size: number) => {
  const response = await clientWithTokenApi.get<ProductListDto>(`/api/product?page=1&size=${size}&orderBy='최신순'`);

  return response.data;
};
