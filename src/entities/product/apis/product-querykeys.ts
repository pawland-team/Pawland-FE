import { queryOptions } from '@tanstack/react-query';

import { getProductDetail, getProductList, getProductSearchList } from '@shared/apis/product-api';
import { SearchListParam } from '@shared/apis/product-api/get-product-search-list-api';

export const productQueryKeys = {
  all: () => ['product'],
  mainList: (size: number) => [...productQueryKeys.all(), size],
  searchList: ({ page, size, region, species, category, isFree, content, orderBy }: SearchListParam) => [
    ...productQueryKeys.all(),
    { page, size, region, species, category, isFree, content, orderBy },
  ],
  productDetail: (id: number) => [...productQueryKeys.all(), id],
};

export const productQuery = {
  all: () =>
    queryOptions({
      queryKey: productQueryKeys.all(),
    }),

  mainList: (size: number) =>
    queryOptions({
      queryKey: productQueryKeys.mainList(size),
      queryFn: () => getProductList(size),
      // gcTime은 기본 5분
      staleTime: 1 * 60 * 1000, // 1 minute
    }),

  // ? : 검색 리스트는 리렌더링 시간이 짧은 경우가 많을것 같아서 staleTime 0 으로 유지..?
  searchList: ({ page, size, region, species, category, isFree, content, orderBy }: SearchListParam) =>
    queryOptions({
      queryKey: productQueryKeys.searchList({ page, size, region, species, category, isFree, content, orderBy }),
      queryFn: () => getProductSearchList({ page, size, region, species, category, isFree, content, orderBy }),
      staleTime: 0,
      retry: false,
    }),

  productDetail: (id: number, retryCount?: number) =>
    queryOptions({
      queryKey: productQueryKeys.productDetail(id),
      queryFn: () => getProductDetail(id),
      staleTime: 10 * 60 * 1000, // 10 min
      gcTime: 15 * 60 * 1000, // 15 min
      enabled: typeof id === 'number', // product-register page에서 id가 없는 경우(undefined) 수정이 아닌 것으로 판단하여 쿼리를 실행하지 않도록 설정. number일 때만 실행
      retry: retryCount ?? 3,
    }),
};
