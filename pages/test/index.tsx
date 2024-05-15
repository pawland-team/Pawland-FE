import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const Test = ({
  cookies,
}: Partial<{
  [key: string]: string;
}>) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  return <div>{cookies?.jwt!}</div>;
};

export default Test;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req, res } = context;

  console.log('-----------------Set-Cookie-----------------');
  console.log(res.getHeader('Set-Cookie'));
  console.log('-----------------Request Cookies-----------------');
  console.log(req.cookies);

  return {
    props: {
      cookies: req.cookies,
    },
  };
};
