import Head from 'next/head';

import { ProductCardItem } from '@entities/product/product-card-item';

export const HomePage = () => {
  return (
    <>
      <Head>
        <title>Pawland Home</title>
        <meta name='description' content='Generated by create next app' />
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>
      <ProductCardItem />
    </>
  );
};