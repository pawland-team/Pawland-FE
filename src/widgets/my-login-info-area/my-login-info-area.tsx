import { LogoutButton } from '@features/button/logout-button';
import { RegisterProductButton } from '@features/button/register-product-button';

import * as S from './my-login-info-area-style';
import { GetUserInfoResponse } from '@shared/apis/user-api';

export const MyLoginInfoArea = ({ loginType, email }: GetUserInfoResponse) => {
  return (
    <S.MyLoginInfoArea>
      <S.LoginInfo>{loginType === '일반' ? `${email}로 로그인 중` : `${loginType}로 로그인 중`}</S.LoginInfo>
      <LogoutButton />
      <RegisterProductButton />
    </S.MyLoginInfoArea>
  );
};
