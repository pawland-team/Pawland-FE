import { Loading } from '@app/layout/loading';
import { useGetSearchResultList } from '@entities/product/hooks/use-get-search-result-list.query';
import { ProductFlexList } from '@entities/product/ui';

const ProductSearchResultList = () => {
  const initialParams = {
    page: 1,
    size: 12,
    region: '',
    species: '',
    category: '',
    isFree: false,
    orderBy: '',
  };

  const { data, isLoading } = useGetSearchResultList(initialParams);

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    return <ProductFlexList listData={data?.content} />;
  }
};

export { ProductSearchResultList };
