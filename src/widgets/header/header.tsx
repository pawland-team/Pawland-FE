import { toast } from 'react-toastify';

import Image from 'next/image';
import Link from 'next/link';

import { useGetUserInfo } from '@entities/user/hooks';
import { NicknameWithAvatar } from '@entities/user/ui';
import { CommonLink } from '@shared/ui/buttons/common-link';

import * as S from './header-style';

const Header = () => {
  const { data, status } = useGetUserInfo();

  const handleNotReadyAleart = () => {
    toast.warning('준비중입니다! 기대해주세요 :)');
  };

  return (
    <>
      <S.HeaderArea>
        <S.HeaderContainer>
          <S.LogoBox>
            <Link href='/'>
              <Image src='/images/logo/main-logo.svg' alt='Pawland 로고' width={63} height={40} />
            </Link>
          </S.LogoBox>
          <S.NavContainer>
            <ul>
              <li>
                <Link href='/product'>중고거래</Link>
              </li>
              <li>
                <Link href='/community/list'>커뮤니티</Link>
              </li>
              <li>
                <Link href='/pet-allowed'>반려동물동반</Link>
              </li>
              <li className='disabled'>
                <button type='button' onClick={handleNotReadyAleart}>
                  이벤트
                </button>
              </li>
            </ul>
          </S.NavContainer>
          {status === 'success' && data ? (
            <S.LinkGroupContainer>
              <div className='link-box'>
                <Link href='/'>
                  <Image width={32} height={32} src='/images/icon/bell-icon.svg' alt='알람 아이콘' />
                </Link>
                <Link href='/chat'>
                  <Image width={32} height={32} src='/images/icon/chat-icon.svg' alt='채팅 아이콘' />
                </Link>
              </div>
              <NicknameWithAvatar nickname={data.nickname} imageSrc={data.profileImage} />
            </S.LinkGroupContainer>
          ) : (
            <CommonLink maxWidth='172px' fontWeight='700' href='/login'>
              로그인/회원가입
            </CommonLink>
          )}
        </S.HeaderContainer>
      </S.HeaderArea>
    </>
  );
};

export { Header };
