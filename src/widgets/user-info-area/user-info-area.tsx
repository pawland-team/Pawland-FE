import { UserEntity } from '@shared/apis/user-api';
import { CommonButton } from '@shared/ui/buttons';

import * as S from './user-info-area-style';

import { EditProfileButton } from '@features/button/edit-profile-button';

import * as S from './user-info-area-style';

interface UserInfoProps {
  userData: UserEntity;
}

const UserInfoArea = ({ userData }: UserInfoProps) => {
  return (
    <S.UserInfoArea>
      <S.ProfileImage src={userData?.profileImage} alt='프로필 이미지' width={200} height={200} />
      <S.TextArea>
        <S.UserNickname>{userData?.nickname}</S.UserNickname>
        <S.UserIntroduce>{userData?.userDesc}</S.UserIntroduce>
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
          <S.Number>{userData?.stars}</S.Number>
        </S.Rating>
        <S.Review>
          <S.Title>전체 리뷰수</S.Title>
          <S.Number>{userData?.reviewCount}</S.Number>
        </S.Review>
      </S.RatingArea>
    </S.UserInfoArea>
  );
};

export { UserInfoArea };
