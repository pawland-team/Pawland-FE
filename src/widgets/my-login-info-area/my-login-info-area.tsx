import { LogoutButton } from '@features/button/logout-button';
import { RegisterProductButton } from '@features/button/register-product-button';

import * as S from './my-login-info-area-style';

export const MyLoginInfoArea = () => {
  return (
    <S.MyLoginInfoArea>
      <S.LoginInfo>카카오톡으로 로그인 중</S.LoginInfo>
      <LogoutButton />
      <RegisterProductButton />
    </S.MyLoginInfoArea>
  );
};
