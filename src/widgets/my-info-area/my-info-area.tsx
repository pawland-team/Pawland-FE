import * as S from './my-info-area-style';
import Image from 'next/image';
import { EditProfileButton } from '../../features/button/edit-profile-button/edit-profile-button';
import Link from 'next/link';

interface MyInfoProps {
  imageSrc?: string;
  nickname?: string;
  description?: string;
}

const MyInfoArea = ({ imageSrc, nickname, description }: MyInfoProps) => {
  return (
    <S.MyInfoArea>
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
    </S.MyInfoArea>
  );
};

export { MyInfoArea };
