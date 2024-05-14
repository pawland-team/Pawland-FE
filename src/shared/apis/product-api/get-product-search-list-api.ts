import { ProductListDto } from './dto';
import { clientWithTokenApi } from '../instance';

export interface SearchListParam {
  page: number;
  size: number;
  region: string;
  species: string;
  category: string;
  isFree: string;
  orderBy: string;
  content: string | null;
}

/**
 *
 * 상품 리스트 / 검색 결과에 사용됨
 */

export const getProductSearchList = async ({
  page,
  size,
  region,
  species,
  category,
  isFree,
  orderBy,
  content = null,
}: SearchListParam) => {
  const response = await clientWithTokenApi.get<ProductListDto>(
    `/api/product?page=${page}&size=${size}&region=${region}&species=${species}&category=${category}&isFree=${isFree}&content=${content}&orderBy=${orderBy}`,
  );

  return response.data;
};
