import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { productQuery } from '@entities/product/apis/product-querykeys';
import { ProductPage } from '@pages/product';
import { getQueryClient } from '@shared/lib/get-query-client';

// const Product = () => {
//   return <ProductPage />;
// };

export default ProductPage;

// TODO: 이거 프리패치한 data를 props로 넘겨줘야하는거 아닌가? 더 찾아봐야함 지금 상품 리스트 html에 안담겨옴
// pre-patching
export const getServerSideProps: GetServerSideProps<{ dehydratedState: DehydratedState }> = async () => {
  const queryClient = getQueryClient();
  // const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    ...productQuery.searchList({
      page: 1,
      size: 12,
      region: '',
      species: '',
      category: '',
      isFree: false,
      orderBy: '최신순',
    }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
