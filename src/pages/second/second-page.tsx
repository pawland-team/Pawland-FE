import Head from 'next/head';
import Link from 'next/link';

import * as S from './style';

export const SecondPage = () => {
  return (
    <>
      <Head>
        <title>Secon Page</title>
      </Head>
      <header>
        <S.Test>ㅎㅇ</S.Test>
        <nav>
          <ul>
            <li>
              <Link href='/'>move to home</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
