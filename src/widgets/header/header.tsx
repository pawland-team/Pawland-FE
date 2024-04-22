import Image from 'next/image';
import Link from 'next/link';

import { SearchInput } from '../../shared/ui/inputs';
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
          <S.InputBox>
            <SearchInput placeholder='원하시는 상품을 검색해보세요!' />
          </S.InputBox>
          <S.LinkGroupContainer>
            <Link href='/chat'>
              <img src='/assets/images/icons/chat-icon-33363F-w32-h32.svg' alt='채팅 아이콘' />
            </Link>
          </S.LinkGroupContainer>
        </S.HeaderContainer>
      </S.HeaderArea>
    </>
  );
};

export { Header };
