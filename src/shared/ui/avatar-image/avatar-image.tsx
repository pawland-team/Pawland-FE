import * as S from './avatar-image-style';

export interface AvatarImageProps {
  imageSrc: string;
  avatarBorderRadius?: string;
  avatarWidth?: string;
  avatarHeight?: string;
  nickname?: string;
}

const AvatarImage = ({
  imageSrc,
  avatarBorderRadius = '100%',
  avatarWidth = '40px',
  avatarHeight = '40px',
  nickname,
}: AvatarImageProps) => {
  return (
    <S.AvatarImage $avatarBorderRadius={avatarBorderRadius} $avatarWidth={avatarWidth} $avatarHeight={avatarHeight}>
      <img src={imageSrc} alt={nickname ? `${nickname}님의 프로필 이미지` : '프로필 이미지'} />
    </S.AvatarImage>
  );
};

export { AvatarImage };
