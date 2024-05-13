import Image from 'next/image';
import Link from 'next/link';

import { PAWLAND_GITHUB } from '@shared/constants/link';

import * as S from './footer-style';

const Footer = () => {
  return (
    <S.FooterArea>
      <S.UpperContainer className='upper-container'>
        <div className='logo-box'>
          <Image src='/images/logo/big-text-main-logo.svg' quality={20} priority alt='포랜드 로고' fill sizes='279px' />
        </div>
        <nav className='nav-box'>
          <div>
            <h5>Category</h5>
            <ul>
              <li>
                <Link href='/product?page=1&size=12&orderBy="최신순"'>All Products</Link>
              </li>
              <li>
                <Link href='/product?page=1&size=12&category="음식"&orderBy="최신순"'>Food</Link>
              </li>
              <li>
                <Link href='/product?page=1&size=12&category="장난감"&orderBy="최신순"'>Toy</Link>
              </li>
              <li>
                <Link href='/product?page=1&size=12&category="옷"&orderBy="최신순"'>clothes</Link>
              </li>
              <li>
                <Link href='/product?page=1&size=12&category="악세서리"&orderBy="최신순"'>Accessories</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Community</h5>
            <ul>
              <li>
                <Link href='/community/list'>All Posts</Link>
              </li>
              <li>
                <Link href='/community/list'>Popular Posts</Link>
              </li>
            </ul>
          </div>
        </nav>
      </S.UpperContainer>
      <S.LowerContainer>
        <div className='policy-box'>
          <Link href={PAWLAND_GITHUB}>Privacy Policy</Link>
          <Link href={PAWLAND_GITHUB}>Contact Us</Link>
          <p>Copyright&#169; 2024. PawLand All Rights Reserved.</p>
        </div>
        <div className='sns-box' />
      </S.LowerContainer>
    </S.FooterArea>
  );
};

export { Footer };
