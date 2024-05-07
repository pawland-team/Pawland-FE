import { AxiosError } from 'axios';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { GetUserInfoResponse } from '@shared/apis/user-api';

export const withGetServerSideProps = (getServerSideProps: GetServerSideProps) => {
  // return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{ [key: string]: any }>> => {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{ [key: string]: any }>> => {
    // 클라이언트 전환을 위해 _next/data 접두사를 제거하고 원본 쿼리 값을 포함하는 정규화된 요청 URL 버전입니다.
    // const pagePath = context.resolvedUrl;

    // https://stackoverflow.com/questions/75478082/how-to-use-resolvedurl-with-getserversideprops-in-nextjs-13
    // https://developer.mozilla.org/ko/docs/Web/API/URL/pathname
    // const pathName = new URL(
    //   pagePath,
    //   process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT}` : process.env.DEPLOY_SERVER_URL,
    // ).pathname;

    console.log(context.req.cookies.jwt); // undefined
    console.log(context.req.headers.cookie); // undefined
    console.log(context.req.headers['set-cookie']); // undefined
    console.log(context.req.headers['Set-Cookie']); // undefined
    console.log(context.res.getHeader('set-cookie')); // undefined
    console.log(context.res.getHeader('Set-Cookie')); // undefined

    try {
      const res: { [key: string]: any } = await getServerSideProps(context);
      //  const response = await getUserInfo();

      const response = await fetch(`${process.env.SERVER_URL_ON_SSR}/api/user/my-info`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      const data = (await response.json()) as GetUserInfoResponse;

      // return {
      //   ...res,
      //   props: {
      //     ...res.props,
      //     userInfo: response,
      //   },
      // };
      return {
        ...res,
        props: {
          ...res.props,
          userInfo: data,
        },
      };
    } catch (error) {
      console.log('error on withGetServerSideProps');
      console.error(error);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return {
            redirect: {
              destination: '/login',
              permanent: false,
            },
          };
        }
      }

      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    // return await getServerSideProps(context)
    //   .then(async (res: { [key: string]: any }) => {
    //     // const response = await getUserInfo();
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/my-info`, {
    //       credentials: 'include',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       mode: 'cors',
    //     });
    //     const data = (await response.json()) as GetUserInfoResponse;

    //     return {
    //       ...res,
    //       props: {
    //         ...res.props,
    //         userInfo: data,
    //       },
    //     };
    //   })
    //   .catch((error: unknown) => {
    //     console.log('error on withGetServerSideProps');
    //     console.error(error);

    //     if (error instanceof AxiosError) {
    //       if (error.status === 401) {
    //         return {
    //           redirect: {
    //             destination: '/login',
    //             permanent: false,
    //             statusCode: 401,
    //           },
    //         };
    //       }
    //     }

    //     return {
    //       redirect: {
    //         destination: '/login',
    //         permanent: false,
    //       },
    //     };
    //   });
  };
};
