import { CommonButton } from '@shared/ui/buttons';
import * as S from './user-info-area-style';

interface UserInfoProps {
  imageSrc?: string;
  nickname?: string;
  description?: string;
}

const UserInfoArea = ({ imageSrc, nickname, description }: UserInfoProps) => {
  return (
    <S.UserInfoArea>
      <S.ProfileImage src={imageSrc} alt='프로필 이미지' width={200} height={200} />
      <S.TextArea>
        <S.UserNickname>{nickname}</S.UserNickname>
        <S.UserIntroduce>{description}</S.UserIntroduce>
        <CommonButton
          borderRadius={'4px'}
          backgroundColor={'#43ADFF'}
          maxWidth={'65px'}
          fontSize={'1.2rem'}
          padding={'6px 10px'}
        >
          채팅하기
        </CommonButton>
      </S.TextArea>
      <S.RatingArea>
        <S.Rating>
          <S.Title>평점</S.Title>
          <S.Number>4.7</S.Number>
        </S.Rating>
        <S.Review>
          <S.Title>전체 리뷰수</S.Title>
          <S.Number>104</S.Number>
        </S.Review>
      </S.RatingArea>
    </S.UserInfoArea>
  );
};

export { UserInfoArea };
