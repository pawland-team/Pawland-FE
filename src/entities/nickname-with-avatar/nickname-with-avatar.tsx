import { AvatarImage } from '@shared/ui/avatar-image';

import * as S from './nickname-with-avatar-style';

interface NicknameWithAvatarProps {
  imageSrc: string;
  nickname: string;
}

const NicknameWithAvatar = ({ imageSrc, nickname }: NicknameWithAvatarProps) => {
  return (
    <S.NicknameWithAvatar>
      <p>{nickname}</p>
      <AvatarImage imageSrc={imageSrc} />
    </S.NicknameWithAvatar>
  );
};

export { NicknameWithAvatar };
