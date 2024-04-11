import styled from 'styled-components';

import { UserProfile } from '@shared/api/user-api';

interface UserProfileProps {
  userProfile: UserProfile;
}

export const RoundUserProfile = ({ userProfile }: UserProfileProps) => {
  const { name, email } = userProfile;

  return (
    <S.Round>
      <h1>{name}</h1>
      <p>{email}</p>
    </S.Round>
  );
};

const S = {
  Round: styled.div`
    border-radius: 50%;
  `,
};
