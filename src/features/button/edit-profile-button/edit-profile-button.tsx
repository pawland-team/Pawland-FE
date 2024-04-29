import Image from '../../../../node_modules/next/image';
import Link from '../../../../node_modules/next/link';
import * as S from './edit-profile-button-style';

export const EditProfileButton = () => {
  return (
    <Link href='/profile/edit'>
      <S.EditProfileButton>
        <Image width={24} height={24} src='images/icon/pencil-icon.svg' alt='연필 아이콘' />
      </S.EditProfileButton>
    </Link>
  );
};
