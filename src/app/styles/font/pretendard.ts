import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: './fonts/pretendard/Pretendard-ExtraBold.woff',
      weight: '800',
    },
    {
      path: './fonts/pretendard/Pretendard-Bold.woff',
      weight: '700',
    },
    {
      path: './fonts/pretendard/Pretendard-SemiBold.woff',
      weight: '600',
    },
    {
      path: './fonts/pretendard/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: './fonts/pretendard/Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: './fonts/pretendard/Pretendard-Light.woff',
      weight: '300',
    },
    {
      path: './fonts/pretendard/Pretendard-ExtraLight.woff',
      weight: '200',
    },
    {
      path: './fonts/pretendard/Pretendard-Thin.woff',
      weight: '100',
    },
  ],
  display: 'swap',
});
