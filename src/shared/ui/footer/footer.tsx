import { MouseEvent } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PAWLAND_GITHUB } from '@shared/constants/link';
import { translateEnglishToKorean } from '@widgets/main-category-list/lib';
import { useCheckedCategoryStore } from '@widgets/product-list-filter-container/model';

import * as S from './footer-style';

const Footer = () => {
  const router = useRouter();
  const { clearSelectedValues, changePagingStatus, pagingStatus, addSelectedValue } = useCheckedCategoryStore();

  const handleClickProductLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const target = e.target as HTMLButtonElement;

    if (target) {
      const targetText = target.innerText;
      clearSelectedValues();
      changePagingStatus(1, 12, pagingStatus.totalItemCount);

      if (targetText !== 'All Products') {
        addSelectedValue('category', translateEnglishToKorean(targetText), true);
      }

      return router.push('/product');
    }
  };

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
                <button type='button' onClick={handleClickProductLink}>
                  All Products
                </button>
              </li>
              <li>
                <button type='button' onClick={handleClickProductLink}>
                  Food
                </button>
              </li>
              <li>
                <button type='button' onClick={handleClickProductLink}>
                  Toy
                </button>
              </li>
              <li>
                <button type='button' onClick={handleClickProductLink}>
                  Clothes
                </button>
              </li>
              <li>
                <button type='button' onClick={handleClickProductLink}>
                  Accessories
                </button>
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
