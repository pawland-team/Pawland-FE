import styled from 'styled-components';

const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 380px;
  height: 100vh;
  margin: 0 auto;
`;

const SignupPageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  margin-bottom: 40px;
`;

const SignupPageForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignupPageBottomContainer = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
`;

const SignupPageTitle = styled.h1`
  font-family: Imcre-Soojin, sans-serif;
  font-size: 4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.black_000000};
`;

const SignupPageTitleSpan = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const SignupPageInputContainer = styled.div`
  position: relative;
  margin-top: 20px;
`;

const SignupPageInput = styled.input`
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

const SignupPageVerifyInput = styled.input`
  width: 70%;
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

const SignupPageErrorSpan = styled.span`
  margin-top: 5px;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.red_F5511D};
`;

const SignupInputIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);

  color: ${({ theme }) => theme.color.gray_BDBDBD};
`;

const SignupPageTimerSpan = styled.span`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.modal};
  top: 50%;
  left: 56%;
  transform: translateY(-50%);

  font-family: Pretendard, sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.black_000000};
`;

const SignupPageEmailVerificationButton = styled.button`
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translateY(-50%);

  padding: 4px 10px;

  font-family: Pretendard, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 20px;
  color: ${({ theme }) => theme.color.white_FFFFFF};

  background-color: ${({ theme }) => theme.color.red_F5511D};
  border-radius: 4px;
`;

const SignupPageEmailVerificationReSendButton = styled.button`
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translateY(-50%);

  padding: 4px 10px;

  font-family: Pretendard, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 20px;
  color: ${({ theme }) => theme.color.white_FFFFFF};

  background-color: ${({ theme }) => theme.color.blue_43ADFF};
  border-radius: 4px;
`;

const SignupPageEmailVerificationDisabledButton = styled.button`
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translateY(-50%);

  padding: 4px 10px;

  font-family: Pretendard, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 20px;
  color: ${({ theme }) => theme.color.white_FFFFFF};

  background-color: ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 4px;
`;

const HideButtonWrapper = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
`;

const SignupInputPasswordShowOrHideButton = styled.button`
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translateY(-50%);
`;

const SignupPageSubmitButton = styled.button`
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

const SignupPageDisabledButton = styled.button`
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

const SignupPageBottomSpan = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const SignupPageBottomLink = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.black_000000};
  text-decoration: underline;
`;

export {
  SignupPageTitle,
  SignupPageTitleSpan,
  SignupPageInput,
  SignupPageVerifyInput,
  SignupPageErrorSpan,
  SignupInputIcon,
  SignupPageTimerSpan,
  SignupPageEmailVerificationButton,
  SignupPageEmailVerificationReSendButton,
  SignupPageEmailVerificationDisabledButton,
  SignupPageInputContainer,
  HideButtonWrapper,
  SignupInputPasswordShowOrHideButton,
  SignupPageSubmitButton,
  SignupPageDisabledButton,
  SignupPageBottomSpan,
  SignupPageBottomLink,
  SignupPageContainer,
  SignupPageTitleContainer,
  SignupPageForm,
  SignupPageBottomContainer,
};
