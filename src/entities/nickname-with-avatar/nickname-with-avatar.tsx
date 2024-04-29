import { useState } from 'react';

import Link from 'next/link';

import { AvatarImage } from '@shared/ui/avatar-image';

import * as S from './nickname-with-avatar-style';

interface NicknameWithAvatarProps {
  imageSrc: string;
  nickname: string;
}

const NicknameWithAvatar = ({ imageSrc, nickname }: NicknameWithAvatarProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClickAvatar = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <S.NicknameWithAvatar>
      <S.NickNameImageBox onClick={handleClickAvatar}>
        <p>{nickname}</p>
        <AvatarImage imageSrc={imageSrc} />
      </S.NickNameImageBox>
      {isOpened && (
        <S.DropDownMenu role='navigation' className='dropdown-menu'>
          <li>
            <Link href='/'>프로필</Link>
          </li>
          <li>
            <Link href='/'>상품 등록</Link>
          </li>
          <li>
            <button type='button'>로그아웃</button>
          </li>
        </S.DropDownMenu>
      )}
    </S.NicknameWithAvatar>
  );
};

export { NicknameWithAvatar };
