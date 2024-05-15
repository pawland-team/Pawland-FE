import { ParsedUrlQuery } from 'querystring';

import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { ProductEditPage } from '@pages/product-edit/ui';
import { prefetchProductDetail } from '@pages/product-edit/utils/prefetch-product-detail';
import { getQueryClient } from '@shared/lib/get-query-client';

export default ProductEditPage;

interface ProductEditPageProps {
  dehydratedState: DehydratedState;
  productId: number;
}

interface ProductEditPageQuery extends ParsedUrlQuery {
  productId?: string;
}

export const getServerSideProps: GetServerSideProps<ProductEditPageProps> = async (
  context: GetServerSidePropsContext<ProductEditPageQuery>,
) => {
  if (!context.params || !context.params.productId) {
    return {
      notFound: true,
    };
  }

  const { productId } = context.params;
  const numericProductId = Number(productId);

  const queryclient = getQueryClient();
  await prefetchProductDetail({ queryClient: queryclient, productId: numericProductId });

  return {
    props: {
      dehydratedState: dehydrate(queryclient),
      productId: numericProductId,
    },
  } satisfies GetServerSidePropsResult<ProductEditPageProps>;
};
