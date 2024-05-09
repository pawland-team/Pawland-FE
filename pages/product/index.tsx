import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { productQuery } from '@entities/product/apis/product-querykeys';
import { ProductPage } from '@pages/product';
import { getQueryClient } from '@shared/lib/get-query-client';

// const Product = () => {
//   return <ProductPage />;
// };

export default ProductPage;

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
