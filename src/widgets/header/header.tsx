import Image from 'next/image';
import Link from 'next/link';

import { NicknameWithAvatar } from '@entities/nickname-with-avatar';

import * as S from './header-style';

const Header = () => {
  return (
    <>
      <S.HeaderArea>
        <S.HeaderContainer>
          <S.LogoBox>
            <Link href='/'>
              <Image src='/assets/images/logos/header-logo.svg' alt='Pawland 로고' width={63} height={40} />
            </Link>
          </S.LogoBox>
          <S.NavContainer>
            <ul>
              <li>
                <Link href='/'>중고거래</Link>
              </li>
              <li>
                <Link href='/'>커뮤니티</Link>
              </li>
              <li>
                <Link href='/'>반려동물동반</Link>
              </li>
              <li>
                <Link href='/'>이벤트</Link>
              </li>
            </ul>
          </S.NavContainer>
          <S.LinkGroupContainer>
            <div className='link-box'>
              <Link href='/'>
                <Image
                  width={32}
                  height={32}
                  src='/assets/images/icons/bell-icon-33363F-w32-h32.svg'
                  alt='알람 아이콘'
                />
              </Link>
              <Link href='/chat'>
                <img src='/assets/images/icons/chat-icon-33363F-w32-h32.svg' alt='채팅 아이콘' />
              </Link>
            </div>
            <NicknameWithAvatar nickname='홍길동' imageSrc='https://loremflickr.com/600/400' />
          </S.LinkGroupContainer>
        </S.HeaderContainer>
      </S.HeaderArea>
    </>
  );
};

export { Header };
