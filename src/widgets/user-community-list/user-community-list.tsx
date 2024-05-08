import { UserCommunityPostItem } from '@entities/user/ui/user-community-post-item';
import * as S from './user-community-list-style';

export const UserCommunityList = () => {
  return (
    <S.UserCommunityList>
      <h3>'닉네임'님이 작성한 글</h3>
      <UserCommunityPostItem />
    </S.UserCommunityList>
  );
};
