import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Modal } from '@shared/ui/modal';

import * as S from './signup-page-style';

interface FormValues {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  verificationCode: string;
}

export const SignupPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [verificationCodeEntered, setVerificationCodeEntered] = useState<string>('');
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(180);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });
  const password = watch('password');
  const email = watch('email');

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const openModal = (content: string): void => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeMdal = (): void => {
    setModalOpen(false);

    if (modalContent === '회원가입이 완료되었습니다.') {
      router.push('/login');
    }
  };

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfirmation = (): void => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  // 닉네임 중복 체크 아직 백엔드 구현 안 됨
  // const dupCheckNickname = async (nickname) => {
  //   if (!nickname) {
  //     return;
  //   }

  //   const response = await fetch(`${BASE_URL}/api/auth/nickname-dupcheck`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       nickname,
  //     }),
  //   });

  //   if (response.status === 400) {
  //     setError('nickname', {
  //       type: 'manual',
  //       message: '이미 사용 중인 닉네임입니다.',
  //     });
  //   }
  // };

  const dupCheckEmail = async (email: string): Promise<void> => {
    if (!email) {
      return;
    }

    const response = await fetch(`${BASE_URL}/api/auth/email-dupcheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (response.status === 400) {
      setError('email', {
        type: 'manual',
        message: '이미 사용 중인 이메일입니다.',
      });
    }
  };

  const handleVerifyEmail = async (): Promise<void> => {
    await fetch(`${BASE_URL}/api/auth/send-verification-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    setEmailVerified(true);
    openModal('인증 메일이 발송되었습니다.');
    setTimer(180);
  };

  const handleCompleteVerification = async (): Promise<void> => {
    const response = await fetch(`${BASE_URL}/api/auth/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: verificationCodeEntered,
        email,
      }),
    });

    if (response.status === 200) {
      setVerificationSuccess(true);
      openModal('이메일 인증이 완료되었습니다.');
      clearInterval(timerInterval.current as NodeJS.Timeout);
    }

    if (response.status === 400) {
      openModal('잘못된 인증번호입니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (emailVerified && timer > 0) {
      timerInterval.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(timerInterval.current as NodeJS.Timeout);
      openModal('인증 시간이 만료되었습니다. 다시 시도해주세요.');
      setEmailVerified(false);
      setVerificationSuccess(false);
      setTimer(180);
    }

    return () => clearInterval(timerInterval.current as NodeJS.Timeout);
  }, [emailVerified, timer]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: data.nickname,
        email: data.email,
        password: data.password,
      }),
    });

    if (response.status === 201) {
      openModal('회원가입이 완료되었습니다.');
    }
  };

  return (
    <>
      {modalOpen && <Modal content={modalContent} onClose={closeMdal} isOpen={modalOpen} />}
      <Head>
        <title>Pawland Signup</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <S.SignupPageContainer>
          <S.SignupPageTitleContainer>
            <S.SignupPageTitle>회원가입</S.SignupPageTitle>
            <S.SignupPageTitleSpan>회원가입에 필요한 정보를 입력해주세요.</S.SignupPageTitleSpan>
          </S.SignupPageTitleContainer>
          <S.SignupPageForm noValidate onSubmit={handleSubmit(onSubmit)}>
            <S.SignupPageInputContainer>
              <S.SignupInputIcon src='input-nickname-icon.svg' alt='input-nickname-icon' />
              <S.SignupPageInput
                type='text'
                placeholder='닉네임을 정해주세요.'
                style={{ borderColor: errors.nickname && 'red' }}
                {...register('nickname', {
                  required: '* 닉네임을 입력해주세요.',
                  minLength: {
                    value: 2,
                    message: '* 2자 이상의 닉네임을 입력해주세요.',
                  },
                  maxLength: {
                    value: 10,
                    message: '* 10자 이하의 닉네임을 입력해주세요.',
                  },
                  pattern: {
                    value: /^[가-힣a-zA-Z0-9]{2,10}$/,
                    message: '* 한글, 영문, 숫자만 입력 가능합니다.',
                  },
                  // 아직 백엔드 구현 안 됨
                  // onBlur: (e) => dupCheckNickname(e.target.value),
                })}
              />
            </S.SignupPageInputContainer>
            {errors.nickname && <S.SignupPageErrorSpan>{errors.nickname.message}</S.SignupPageErrorSpan>}
            <S.SignupPageInputContainer>
              <S.SignupInputIcon src='input-email-icon.svg' alt='input-email-icon' />
              <S.SignupPageInput
                type='email'
                placeholder='이메일을 입력해주세요.'
                style={{ borderColor: errors.email && 'red' }}
                {...register('email', {
                  required: '* 이메일을 입력해주세요.',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: '* 이메일 형식이 올바르지 않습니다.',
                  },
                  onBlur: (e) => dupCheckEmail(e.target.value),
                })}
              />
              {emailVerified ? (
                <S.SignupPageEmailVerificationReSendButton
                  onClick={handleVerifyEmail}
                  type='button'
                  style={{ backgroundColor: verificationSuccess ? '#9E9E9E' : '#2087D6' }}
                  disabled={!email || !!errors.email || verificationSuccess}
                >
                  재전송
                </S.SignupPageEmailVerificationReSendButton>
              ) : (
                <S.SignupPageEmailVerificationButton
                  onClick={handleVerifyEmail}
                  type='button'
                  style={{ backgroundColor: !email || errors.email ? '#9E9E9E' : '#F5511D' }}
                  disabled={!email || !!errors.email || verificationSuccess}
                >
                  인증받기
                </S.SignupPageEmailVerificationButton>
              )}
            </S.SignupPageInputContainer>
            {errors.email && <S.SignupPageErrorSpan>{errors.email.message}</S.SignupPageErrorSpan>}
            {emailVerified && (
              <>
                <S.SignupPageInputContainer>
                  <S.SignupInputIcon src='input-email-icon.svg' alt='input-email-icon' />
                  <S.SignupPageVerifyInput
                    type='text'
                    placeholder='인증번호를 입력해주세요.'
                    style={{ borderColor: errors.verificationCode && 'red' }}
                    {...register('verificationCode', {
                      required: '* 인증번호를 입력해주세요.',
                      minLength: {
                        value: 6,
                        message: '* 인증번호는 6자리 숫자입니다.',
                      },
                      maxLength: {
                        value: 6,
                        message: '* 인증번호는 6자리 숫자입니다.',
                      },
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: '* 인증번호는 숫자로만 구성되어야 합니다.',
                      },
                    })}
                    onChange={(e) => setVerificationCodeEntered(e.target.value)}
                  />
                  <S.SignupPageTimerSpan>{formatTime(timer)}</S.SignupPageTimerSpan>
                  {verificationSuccess ? (
                    <S.SignupPageEmailVerificationDisabledButton type='button' disabled={verificationSuccess}>
                      인증완료
                    </S.SignupPageEmailVerificationDisabledButton>
                  ) : (
                    <S.SignupPageEmailVerificationButton
                      type='button'
                      style={{ backgroundColor: verificationCodeEntered ? '#F5511D' : '#9E9E9E' }}
                      disabled={!verificationCodeEntered || verificationSuccess}
                      onClick={handleCompleteVerification}
                    >
                      인증완료
                    </S.SignupPageEmailVerificationButton>
                  )}
                </S.SignupPageInputContainer>
                {errors.verificationCode && (
                  <S.SignupPageErrorSpan>{errors.verificationCode.message}</S.SignupPageErrorSpan>
                )}
              </>
            )}

            <S.SignupPageInputContainer>
              <S.SignupInputIcon src='input-password-icon.svg' alt='input-password-icon' />
              <S.SignupPageInput
                type={showPassword ? 'text' : 'password'}
                placeholder='비밀번호를 적어주세요.'
                style={{ borderColor: errors.password && 'red' }}
                {...register('password', {
                  required: '* 비밀번호를 입력해주세요.',
                  minLength: {
                    value: 8,
                    message: '* 영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.',
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
                    message: '* 영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.',
                  },
                })}
              />
              <S.SignupInputPasswordShowOrHideButton type='button' onClick={toggleShowPassword}>
                <Image
                  fill
                  src={showPassword ? '/input-eye-open-icon.svg' : '/input-eye-close-icon.svg'}
                  alt='show-or-hide-password-icon'
                />
              </S.SignupInputPasswordShowOrHideButton>
            </S.SignupPageInputContainer>
            {errors.password && <S.SignupPageErrorSpan>{errors.password.message}</S.SignupPageErrorSpan>}
            <S.SignupPageInputContainer>
              <S.SignupInputIcon src='input-password-icon.svg' alt='input-password-confirm-icon' />
              <S.SignupPageInput
                type={showPasswordConfirmation ? 'text' : 'password'}
                placeholder='비밀번호를 한 번 더 적어주세요.'
                style={{ borderColor: errors.password && 'red' }}
                {...register('passwordConfirmation', {
                  required: '* 비밀번호를 입력해주세요.',
                  validate: (value) => value === password || '* 비밀번호가 일치하지 않습니다.',
                })}
              />
              <S.SignupInputPasswordShowOrHideButton type='button' onClick={toggleShowPasswordConfirmation}>
                <Image
                  fill
                  src={showPasswordConfirmation ? '/input-eye-open-icon.svg' : '/input-eye-close-icon.svg'}
                  alt='show-or-hide-password-confirmation-icon'
                />
              </S.SignupInputPasswordShowOrHideButton>
            </S.SignupPageInputContainer>
            {errors.passwordConfirmation && (
              <S.SignupPageErrorSpan>{errors.passwordConfirmation.message}</S.SignupPageErrorSpan>
            )}
            {verificationSuccess ? (
              <S.SignupPageSubmitButton type='submit'>회원가입</S.SignupPageSubmitButton>
            ) : (
              <S.SignupPageDisabledButton type='submit' disabled>
                인증을 진행해 주세요.
              </S.SignupPageDisabledButton>
            )}
          </S.SignupPageForm>
          <S.SignupPageBottomContainer>
            <S.SignupPageBottomSpan>이미 포랜드 계정이 있으신가요?</S.SignupPageBottomSpan>
            <Link href='/login'>
              <S.SignupPageBottomLink>로그인하기</S.SignupPageBottomLink>
            </Link>
          </S.SignupPageBottomContainer>
        </S.SignupPageContainer>
      </main>
    </>
  );
};
