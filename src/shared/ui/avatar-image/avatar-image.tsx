import Image from 'next/image';

import * as S from './avatar-image-style';

export interface AvatarImageProps {
  imageSrc: string;
  avatarBorderRadius?: number;
  avatarWidth?: number;
  avatarHeight?: number;
  nickname?: string;
}

const AvatarImage = ({
  imageSrc,
  avatarBorderRadius = 50,
  avatarWidth = 40,
  avatarHeight = 40,
  nickname,
}: AvatarImageProps) => {
  return (
    <S.AvatarImage $avatarBorderRadius={avatarBorderRadius} $avatarWidth={avatarWidth} $avatarHeight={avatarHeight}>
      <Image
        src={imageSrc}
        alt={nickname ? `${nickname}님의 프로필 이미지` : '프로필 이미지'}
        width={avatarWidth}
        height={avatarHeight}
      />
    </S.AvatarImage>
  );
};

export { AvatarImage };
