import { EditProfileButton } from '@features/button/edit-profile-button';
import * as S from './user-info-area-style';
import Image from 'next/image';
import Link from 'next/link';

interface UserInfoProps {
  imageSrc?: string;
  nickname?: string;
  description?: string;
}

const UserInfoArea = ({ imageSrc, nickname, description }: UserInfoProps) => {
  return (
    <S.UserInfoArea>
      <div>
        <S.ProfileImage src={imageSrc} alt='프로필 이미지' width={120} height={120} />
        <EditProfileButton />
      </div>
      <S.UserNicknameArea>
        <div>{nickname}</div>
        <Link href='/profile/edit'>
          <Image width={32} height={32} src='images/icon/arrow-icon.svg' alt='화살표 아이콘' />
        </Link>
      </S.UserNicknameArea>
      <S.UserIntroduce>{description}</S.UserIntroduce>
      <S.Line />
    </S.UserInfoArea>
  );
};

export { UserInfoArea };
