import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { HomePage } from '@pages/home';
import { getUserInfoApi } from '@shared/apis/user-api';
import { getQueryClient } from '@shared/lib/get-query-client';

export default HomePage;

interface Test {
  test: string;
  dehydratedState?: DehydratedState;
}

export const getServerSideProps: GetServerSideProps<Test> = async (_context: GetServerSidePropsContext) => {
  // console.log(context.req.headers);
  // console.log('---------------------------------------------------------');
  // console.log(context.res);

  const { name } = await getUserInfoApi();

  return {
    props: {
      test: name,
      dehydratedState: dehydrate(getQueryClient()),
    },
  } satisfies GetServerSidePropsResult<Test>;
};
