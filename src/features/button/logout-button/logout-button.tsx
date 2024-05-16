import * as S from './logout-button-style';

export const LogoutButton = () => {
  const handleLogout = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    window.location.href = '/';
  };
  return <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>;
};
