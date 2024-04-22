import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '/assets/fonts/pretendard/Pretendard-ExtraBold.woff',
      weight: '800',
    },
    {
      path: './woff/Pretendard-Bold.woff',
      weight: '700',
    },
    {
      path: './woff/Pretendard-SemiBold.woff',
      weight: '600',
    },
    {
      path: './woff/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: './woff/Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: './woff/Pretendard-Light.woff',
      weight: '300',
    },
    {
      path: './woff/Pretendard-ExtraLight.woff',
      weight: '200',
    },
    {
      path: './woff/Pretendard-Thin.woff',
      weight: '100',
    },
  ],
  display: 'swap',
});
