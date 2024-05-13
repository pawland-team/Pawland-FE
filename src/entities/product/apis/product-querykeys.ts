import { queryOptions } from '@tanstack/react-query';

import { getProductDetail, getProductList, getProductSearchList } from '@shared/apis/product-api';
import { SearchListParam } from '@shared/apis/product-api/get-product-search-list-api';

export const productQueryKeys = {
  all: () => ['product'],
  mainList: (size: number) => [...productQueryKeys.all(), size],
  searchList: ({ page, size, region, species, category, isFree, orderBy }: SearchListParam) => [
    ...productQueryKeys.all(),
    { page, size, region, species, category, isFree, orderBy },
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
  searchList: ({ page, size, region, species, category, isFree, orderBy }: SearchListParam) =>
    queryOptions({
      queryKey: productQueryKeys.searchList({ page, size, region, species, category, isFree, orderBy }),
      queryFn: () => getProductSearchList({ page, size, region, species, category, isFree, orderBy }),
      retry: false,
    }),

  productDetail: (id: number) =>
    queryOptions({
      queryKey: productQueryKeys.productDetail(id),
      queryFn: () => getProductDetail(id),
      staleTime: 10 * 60 * 1000, // 10 min
      gcTime: 15 * 60 * 1000, // 15 min
    }),
};
