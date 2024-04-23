import styled from 'styled-components';

const SignupPageTitle = styled.h1`
  font-family: Imcre-Soojin, sans-serif;
  font-size: 4rem;
  color: ${({ theme }) => theme.color.black_000000};
`;

const SignupPageSpan = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const SignupPageInputContainer = styled.div`
  position: relative;
`;

const SignupPageInput = styled.input`
  width: 100%;
  height: 64px;
  padding: 20px 50px;

  font-family: Pretendard, sans-serif;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.gray_BDBDBD};

  background-color: ${({ theme }) => theme.color.gray_F3F3F3};
  border: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
  border-radius: 6px;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray_BDBDBD};
  }
`;

const SignupInputIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);

  color: ${({ theme }) => theme.color.gray_BDBDBD};
`;

export { SignupPageTitle, SignupPageSpan, SignupPageInput, SignupInputIcon, SignupPageInputContainer };
