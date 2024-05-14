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
  content: string;
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
  content,
}: SearchListParam) => {
  // const queryString = `?page=${page}&size=${size}&region=${region}&species=${species}&category=${category}&isFree=${isFree}&content=${content}&orderBy=${orderBy}`;
  // console.log({ qs: { page, size, region, species, category, isFree, content, orderBy } });
  const serializedParams = <T extends { [key: string]: any }>({ qs }: { qs: T }) => {
    return Object.keys(qs)
      .filter((key) => qs[key] !== '' && qs[key] !== null && qs[key] !== undefined)
      .map((key) => `${key}=${encodeURIComponent(qs[key])}`)
      .join('&');
  };
  const params = serializedParams({ qs: { page, size, region, species, category, isFree, content, orderBy } });

  const response = await clientWithTokenApi.get<ProductListDto>(`/api/product?${params}`, {
    // params: {
    //   page,
    //   size,
    //   region: region ? encodeURIComponent(region) : null,
    //   species: species ? encodeURIComponent(species) : null,
    //   category: category ? encodeURIComponent(category) : null,
    //   isFree: isFree ? encodeURIComponent(isFree) : null,
    //   content: content ? encodeURIComponent(content) : null,
    //   orderBy: orderBy ? encodeURIComponent(orderBy) : null,
    // },
  });

  return response.data;
};
