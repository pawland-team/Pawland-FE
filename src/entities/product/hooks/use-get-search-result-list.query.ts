// import { useSuspenseQuery } from '@tanstack/react-query';

import { useQuery } from '@tanstack/react-query';

import { SearchListParam } from '@shared/apis/product-api/get-product-search-list-api';

import { productQuery } from '../apis';

export const useGetSearchResultList = ({
  page,
  size,
  region,
  species,
  category,
  isFree,
  content,
  orderBy,
}: SearchListParam) => {
  return useQuery({ ...productQuery.searchList({ page, size, region, species, category, isFree, content, orderBy }) });
  // return useSuspenseQuery({ ...productQuery.searchList({ page, size, region, species, category, isFree, orderBy }) });
};
