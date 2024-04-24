import styled from 'styled-components';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 380px;
  height: 100vh;
  margin: 0 auto;
`;

const LoginPageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  margin-bottom: 40px;
`;

const LoginPageLogo = styled.img`
  width: 200px;
  height: 160px;
`;

const LoginPageForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginPageBottomContainer = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
`;

const LoginPageInputContainer = styled.div`
  position: relative;
  margin-top: 20px;
`;

const LoginPageInput = styled.input`
  width: 100%;
  height: 64px;
  padding: 20px 50px;

  font-family: Pretendard, sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.black_000000};

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
  border-radius: 6px;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray_BDBDBD};
  }
`;

const LoginPageErrorSpan = styled.span`
  margin-top: 5px;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.red_F5511D};
`;

const LoginInputIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);

  color: ${({ theme }) => theme.color.gray_BDBDBD};
`;

const LoginInputPasswordShowOrHideButton = styled.button`
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translateY(-50%);
`;

const LoginPageSubmitButton = styled.button`
  width: 100%;
  height: 64px;
  margin-top: 20px;

  font-family: Pretendard, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white_FFFFFF};

  background-color: ${({ theme }) => theme.color.black_000000};
  border-radius: 6px;
`;

const LoginPageDisabledButton = styled.button`
  width: 100%;
  height: 64px;
  margin-top: 20px;

  font-family: Pretendard, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white_FFFFFF};

  background-color: ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 6px;
`;

const LoginPageBottomSpan = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const LoginPageBottomLink = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.black_000000};
  text-decoration: underline;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SocialLoginWrapper = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  margin-top: 20px;
`;

const SocialLoginLogo = styled.img`
  width: 40px;
  height: 40px;
`;

export {
  LoginPageLogo,
  LoginPageInput,
  LoginPageErrorSpan,
  LoginInputIcon,
  LoginPageInputContainer,
  LoginInputPasswordShowOrHideButton,
  LoginPageSubmitButton,
  LoginPageDisabledButton,
  LoginPageBottomSpan,
  LoginPageBottomLink,
  LoginPageContainer,
  LoginPageTitleContainer,
  LoginPageForm,
  LoginPageBottomContainer,
  SocialLoginContainer,
  SocialLoginWrapper,
  SocialLoginLogo,
};
