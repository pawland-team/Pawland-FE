// import Image from '../../../node_modules/next/image';
import Link from '../../../node_modules/next/link';
import * as S from './user-info-area-style';
import Image from 'next/image';
import { EditProfileButton } from '../../features/button/edit-profile-button/edit-profile-button';

export const UserInfoArea = () => {
  return (
    <S.UserInfoArea>
      <S.ProfileImageArea>
        <S.ProfileImage src='/images/profileImage.png' alt='프로필 이미지' width={120} height={120} />
        <EditProfileButton />
      </S.ProfileImageArea>
      <S.UserNicknameArea>
        <div>닉네임</div>
        <Link href='/profile/edit'>
          <Image width={32} height={32} src='images/icon/arrow-icon.svg' alt='화살표 아이콘' />
        </Link>
      </S.UserNicknameArea>
      <S.UserIntroduce>
        안녕하세요 어쩌구 저쩌구 어쩌구앙어렁ㄹ우ㅏㅜ루냉루ㅐㅑ댁랻누ㅑ루ㅑ두ㅑ루ㅑㄷ누ㅑㅜㅑㄷ누ㅑ루ㅑㄷ구ㅑ랴ㅕ랴ㅜ
      </S.UserIntroduce>
      <S.Line />
    </S.UserInfoArea>
  );
};
