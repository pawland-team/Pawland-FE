import * as S from './user-login-info-area-style';
import { LogoutButton } from '../../features/button/logout-button/logout-button';
import { RegisterProductButton } from '../../features/button/register-product-button/register-product-button';

export const UserLoginInfoArea = () => {
  return (
    <S.UserLoginInfoArea>
      <S.LoginInfo>카카오톡으로 로그인 중</S.LoginInfo>
      <LogoutButton />
      <RegisterProductButton />
    </S.UserLoginInfoArea>
  );
};
