import { UserCommunityPostItem } from '@entities/user/ui/user-community-post-item';

import * as S from './user-community-list-style';
import { useGetUserCommunityList } from '@entities/user/hooks/use-get-user-community-list.query';
import { NoProductBox } from '@shared/ui/error';

interface UserCommunityListProps {
  userId: number;
}

export const UserCommunityList = ({ userId }: UserCommunityListProps) => {
  const initialParams = {
    page: 1,
    userId: userId,
  };

  const { data, status } = useGetUserCommunityList(initialParams);

  if (status === 'success') {
    return (
      <S.UserCommunityList>
        <h3>'닉네임'님이 작성한 글</h3>
        {data?.length === 0 && <NoProductBox />}
        {data.map((item) => (
          <UserCommunityPostItem key={item.id} item={item} />
        ))}
      </S.UserCommunityList>
    );
  }
};
