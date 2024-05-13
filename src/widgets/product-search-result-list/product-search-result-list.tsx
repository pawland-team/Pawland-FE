import { useRouter } from 'next/router';

import { Loading } from '@app/layout/loading';
import { useGetSearchResultList } from '@entities/product/hooks/use-get-search-result-list.query';
import { ProductFlexList } from '@entities/product/ui';
import { SearchListParam } from '@shared/apis/product-api/get-product-search-list-api';
import { NoProductBox } from '@shared/ui/error';

/**
 * 상품 리스트 (검색 결과) + 페이지네이션 같이 있는 컴포넌트
 */

const ProductSearchResultList = () => {
  const router = useRouter();

  const searchParams: SearchListParam = {
    page: Number(router.query.page),
    size: Number(router.query.size),
    region: String(router.query.region),
    species: String(router.query.species),
    category: String(router.query.category),
    isFree: String(router.query.isFree),
    orderBy: String(router.query.orderBy),
  };

  const { data, isLoading } = useGetSearchResultList(searchParams);

  // console.log(`isFetching: ${isFetching}`);
  // console.log(`isLoading: ${isLoading}`);

  // ? : 상품 결과 없을 때 그냥 빈 배열 보내주면 안되는건지?
  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    if (data.content.length > 0) {
      return <ProductFlexList listData={data.content} />;
    }
  }

  return <NoProductBox />;
};

export { ProductSearchResultList };
