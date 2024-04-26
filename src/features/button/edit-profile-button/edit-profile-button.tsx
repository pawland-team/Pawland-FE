import Image from '../../../../node_modules/next/image';
import Link from '../../../../node_modules/next/link';
import * as S from './edit-profile-button-style';

export const EditProfileButton = () => {
  return (
    <Link href='/profile/edit'>
      <S.EditProfileButton>
        <Image width={24} height={24} src='images/icon/edit-icon.svg' alt='화살표 아이콘' />
      </S.EditProfileButton>
    </Link>
  );
};
