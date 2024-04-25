import Image from 'next/image';
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
  align-items: center;
  justify-content: center;

  margin-bottom: 50px;
`;

const LoginPageLogo = styled.img`
  width: 200px;
  height: 160px;
`;

const LoginPageForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginPageInputContainer = styled.div`
  position: relative;
  margin-top: 6px;
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

const InputIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);

  width: 24px;
  height: 24px;
`;

const LoginInputIcon = styled(Image)`
  color: ${({ theme }) => theme.color.gray_BDBDBD};
  object-fit: cover;
`;

const HideButtonWrapper = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
`;

const LoginInputPasswordShowOrHideButton = styled.button`
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translateY(-50%);
`;

const LoginPageErrorContainer = styled.div`
  position: relative;
  width: 100%;
  height: 43px;
  margin-top: 6px;
`;

const LoginPageErrorWrapper = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  opacity: 0.2;
  background-color: ${({ theme }) => theme.color.red_FFC2AF};
  border-radius: 6px;
`;

const ErrorIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);

  width: 14px;
  height: 13px;
`;

const LoginPageErrorIcon = styled(Image)`
  object-fit: cover;
`;

const LoginPageErrorSpan = styled.span`
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);

  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.red_F5511D};
`;

const LoginCredentialsSaveContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const LoginCredentailsSaveCheckbox = styled.input`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const LoginPageSubmitButton = styled.button`
  width: 100%;
  height: 64px;
  margin-top: 40px;

  font-family: Pretendard, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white_FFFFFF};

  background-color: ${({ theme }) => theme.color.black_000000};
  border-radius: 6px;
`;

const LinkToSignupPageButton = styled.button`
  width: 100%;
  height: 64px;
  margin-top: 12px;

  font-family: Pretendard, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.black_000000};

  background-color: ${({ theme }) => theme.color.white_FFFFFF};
  border: 1px solid ${({ theme }) => theme.color.black_000000};
  border-radius: 6px;
`;

const LoginPageBottomBorderLine = styled.div`
  width: 100%;
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
`;

const LoginPageBottomSpan = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
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

const SocialIconWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

const SocialLoginLogo = styled(Image)`
  object-fit: cover;
`;

export {
  LoginPageLogo,
  InputIconWrapper,
  LoginPageInput,
  LoginPageErrorContainer,
  LoginPageErrorWrapper,
  ErrorIconWrapper,
  LoginPageErrorIcon,
  LoginPageErrorSpan,
  LoginInputIcon,
  LoginPageInputContainer,
  HideButtonWrapper,
  LoginInputPasswordShowOrHideButton,
  LoginCredentialsSaveContainer,
  LoginCredentailsSaveCheckbox,
  LoginPageSubmitButton,
  LinkToSignupPageButton,
  LoginPageBottomBorderLine,
  LoginPageBottomSpan,
  LoginPageContainer,
  LoginPageTitleContainer,
  LoginPageForm,
  SocialLoginContainer,
  SocialLoginWrapper,
  SocialIconWrapper,
  SocialLoginLogo,
};
