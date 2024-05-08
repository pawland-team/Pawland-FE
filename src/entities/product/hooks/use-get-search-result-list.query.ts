import { useQuery } from '@tanstack/react-query';

import { SearchListParam } from '@shared/apis/product-api/get-product-search-list-api';

import { productQuery } from '../apis';

export const useGetSearchResultList = ({ page, size, region, species, category, isFree, orderBy }: SearchListParam) => {
  return useQuery({ ...productQuery.searchList({ page, size, region, species, category, isFree, orderBy }) });
};
