import { queryOptions } from '@tanstack/react-query';

import { getProductDetail, getProductList, getProductSearchList } from '@shared/apis/product-api';

interface SearchListParam {
  page: number;
  size: number;
  region: string;
  species: string;
  category: string;
  isFree: boolean;
  orderBy: string;
}

export const productQueryKeys = {
  all: () => ['product'],
  mainList: (size: number) => [...productQueryKeys.all(), size],
  searchList: ({ page, size, region, species, category, isFree, orderBy }: SearchListParam) => [
    ...productQueryKeys.all(),
    { page, size, region, species, category, isFree, orderBy },
  ],
  productDetail: (id: number) => [...productQueryKeys.all(), id],
};

export const producQuery = {
  all: () =>
    queryOptions({
      queryKey: productQueryKeys.all(),
    }),

  mainList: (size: number) =>
    queryOptions({
      queryKey: productQueryKeys.mainList(size),
      queryFn: () => getProductList(size),
    }),

  searchList: ({ page, size, region, species, category, isFree, orderBy }: SearchListParam) =>
    queryOptions({
      queryKey: productQueryKeys.searchList({ page, size, region, species, category, isFree, orderBy }),
      queryFn: () => getProductSearchList({ page, size, region, species, category, isFree, orderBy }),
    }),

  productDetail: (id: number) =>
    queryOptions({
      queryKey: productQueryKeys.productDetail(id),
      queryFn: () => getProductDetail(id),
    }),
};
