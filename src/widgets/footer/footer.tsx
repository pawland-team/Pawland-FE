import Image from 'next/image';
import Link from 'next/link';

import { PAWLAND_GITHUB } from '@shared/constants/link';

import * as S from './footer-style';

const Footer = () => {
  return (
    <S.FooterArea>
      <S.UpperContainer className='upper-container'>
        <div className='logo-box'>
          <Image src='/images/logo/big-text-main-logo.svg' alt='포랜드 로고' fill sizes='279px' />
        </div>
        <nav className='nav-box'>
          <div>
            <h5>Category</h5>
            <ul>
              <li>
                <Link href='/'>All Products</Link>
              </li>
              <li>
                <Link href='/'>Food</Link>
              </li>
              <li>
                <Link href='/'>Toy</Link>
              </li>
              <li>
                <Link href='/'>clothes</Link>
              </li>
              <li>
                <Link href='/'>Accessories</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Community</h5>
            <ul>
              <li>
                <Link href='/'>All Posts</Link>
              </li>
              <li>
                <Link href='/'>Popular Posts</Link>
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
