import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useModalList } from '@shared/hooks/use-modal';
import { AuthModal } from '@shared/ui/modal/auth-modal';

import * as S from './login-page-style';

interface FormValues {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string;
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberCredentials, setRememberCredentials] = useState<boolean>(false);
  const router = useRouter();
  const { openModalList } = useModalList();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');

    if (storedEmail) {
      setValue('email', storedEmail, { shouldValidate: true });
      setRememberCredentials(true);
    }
  }, [setValue]);

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (response.status === 200) {
      if (rememberCredentials) {
        localStorage.setItem('email', data.email);
      } else {
        localStorage.removeItem('email');
      }

      router.push('/');
    }

    if (response.status === 400) {
      openModalList({
        ModalComponent: AuthModal,
        modalKey: ['login-modal'],
        props: {
          content: '아이디와 비밀번호를 확인해주세요.',
        },
      });
    }
  };

  return (
    <>
      <Head>
        <title>Pawland :: 로그인하기</title>
      </Head>
      <S.LoginPageContainer>
        <Link href='/'>
          <S.LoginPageTitleContainer>
            <S.LoginPageLogo src='/images/logo/small-text-main-logo.svg' />
          </S.LoginPageTitleContainer>
        </Link>
        <S.LoginPageForm noValidate onSubmit={handleSubmit(onSubmit)}>
          <S.LoginPageInputContainer>
            <S.InputIconWrapper>
              <S.LoginInputIcon fill src='images/login-signup-images/input-email-icon.svg' alt='input-email-icon' />
            </S.InputIconWrapper>
            <S.LoginPageInput
              type='email'
              placeholder='이메일을 입력해주세요.'
              style={{ borderColor: errors.email && 'red' }}
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 올바르지 않습니다.',
                },
              })}
            />
          </S.LoginPageInputContainer>

          <S.LoginPageInputContainer>
            <S.InputIconWrapper>
              <S.LoginInputIcon
                fill
                src='images/login-signup-images/input-password-icon.svg'
                alt='input-password-icon'
              />
            </S.InputIconWrapper>
            <S.LoginPageInput
              type={showPassword ? 'text' : 'password'}
              placeholder='비밀번호를 적어주세요.'
              style={{ borderColor: errors.password && 'red' }}
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  message: '영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
                  message: '영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.',
                },
              })}
            />
            <S.LoginInputPasswordShowOrHideButton type='button' onClick={toggleShowPassword}>
              <S.HideButtonWrapper>
                <Image
                  fill
                  src={
                    showPassword
                      ? 'images/login-signup-images/input-eye-open-icon.svg'
                      : 'images/login-signup-images/input-eye-close-icon.svg'
                  }
                  alt='show-or-hide-password-icon'
                />
              </S.HideButtonWrapper>
            </S.LoginInputPasswordShowOrHideButton>
          </S.LoginPageInputContainer>

          {errors.email && (
            <S.LoginPageErrorContainer>
              <S.LoginPageErrorWrapper />
              <S.ErrorIconWrapper>
                <S.LoginPageErrorIcon
                  fill
                  src='images/login-signup-images/login-error-icon.svg'
                  alt='login-error-icon'
                />
              </S.ErrorIconWrapper>
              <S.LoginPageErrorSpan>{errors.email.message}</S.LoginPageErrorSpan>
            </S.LoginPageErrorContainer>
          )}
          {errors.password && (
            <S.LoginPageErrorContainer>
              <S.LoginPageErrorWrapper />
              <S.ErrorIconWrapper>
                <S.LoginPageErrorIcon
                  fill
                  src='images/login-signup-images/login-error-icon.svg'
                  alt='login-error-icon'
                />
              </S.ErrorIconWrapper>
              <S.LoginPageErrorSpan>{errors.password.message}</S.LoginPageErrorSpan>
            </S.LoginPageErrorContainer>
          )}
          <S.LoginCredentialsSaveContainer>
            <S.LoginCredentailsSaveCheckbox
              type='checkbox'
              checked={rememberCredentials}
              onChange={(e) => setRememberCredentials(e.target.checked)}
            />
            <S.LoginPageBottomSpan>이메일 저장</S.LoginPageBottomSpan>
          </S.LoginCredentialsSaveContainer>
          <S.LoginPageSubmitButton>로그인</S.LoginPageSubmitButton>
        </S.LoginPageForm>
        <Link href='/signup'>
          <S.LinkToSignupPageButton>회원가입</S.LinkToSignupPageButton>
        </Link>
        <S.SocialLoginContainer>
          <S.SocialLoginWrapper>
            <S.LoginPageBottomBorderLine />
          </S.SocialLoginWrapper>
          <S.SocialLoginWrapper>
            <S.LoginPageBottomSpan>SNS 계정으로 간편 로그인/회원가입</S.LoginPageBottomSpan>
          </S.SocialLoginWrapper>
          <S.SocialLoginWrapper>
            <Link
              href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=https://midcon.store/api/auth/oauth2/naver&state=1234`}
            >
              <S.SocialIconWrapper>
                <S.SocialLoginLogo fill src='/images/social-media/naver-logo.svg' alt='naver-logo-icon' />
              </S.SocialIconWrapper>
            </Link>
            <Link
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=https://midcon.store/api/auth/oauth2/kakao&response_type=code&prompt=login`}
            >
              <S.SocialIconWrapper>
                <S.SocialLoginLogo fill src='/images/social-media/kakao-logo.svg' alt='kakao-logo-icon' />
              </S.SocialIconWrapper>
            </Link>
            <Link
              href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=https://midcon.store/api/auth/oauth2/google&response_type=code&scope=email profile`}
            >
              <S.SocialIconWrapper>
                <S.SocialLoginLogo fill src='/images/social-media/google-logo.svg' alt='google-logo-icon' />
              </S.SocialIconWrapper>
            </Link>
          </S.SocialLoginWrapper>
        </S.SocialLoginContainer>
      </S.LoginPageContainer>
    </>
  );
};
