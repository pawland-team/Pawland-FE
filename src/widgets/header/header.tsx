import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { NicknameWithAvatar } from '@entities/nickname-with-avatar';
import { CommonButton } from '@shared/ui/buttons';
import { zIndex } from '@shared/ui/styles/z-index';

import * as S from './header-style';

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header = ({ isLoggedIn }: HeaderProps) => {
  const router = useRouter();

  const handleClickLogin = () => {
    router.push('/login');
  };

  return (
    <>
      <S.HeaderArea $zIndex={zIndex}>
        <S.HeaderContainer>
          <S.LogoBox>
            <Link href='/'>
              <Image src='/assets/images/logo/header-logo.svg' alt='Pawland 로고' width={63} height={40} />
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
          {isLoggedIn ? (
            <S.LinkGroupContainer>
              <div className='link-box'>
                <Link href='/'>
                  <Image
                    width={32}
                    height={32}
                    src='/assets/images/icon/bell-icon-33363F-w32-h32.svg'
                    alt='알람 아이콘'
                  />
                </Link>
                <Link href='/chat'>
                  <Image
                    width={32}
                    height={32}
                    src='/assets/images/icon/chat-icon-33363F-w32-h32.svg'
                    alt='채팅 아이콘'
                  />
                </Link>
              </div>
              <NicknameWithAvatar nickname='홍길동' imageSrc='https://loremflickr.com/600/400' />
            </S.LinkGroupContainer>
          ) : (
            <CommonButton maxWidth='172px' fontWeight='700' handleClick={handleClickLogin}>
              로그인/회원가입
            </CommonButton>
          )}
        </S.HeaderContainer>
      </S.HeaderArea>
    </>
  );
};

export { Header };
