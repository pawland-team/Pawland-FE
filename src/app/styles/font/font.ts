import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: './pretendard/Pretendard-Bold.woff',
      weight: '800',
    },
    {
      path: './pretendard/Pretendard-Bold.woff',
      weight: '700',
    },
    {
      path: './pretendard/Pretendard-SemiBold.woff',
      weight: '600',
    },
    {
      path: './pretendard/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: './pretendard/Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: './pretendard/Pretendard-Light.woff',
      weight: '300',
    },
    {
      path: './pretendard/Pretendard-ExtraLight.woff',
      weight: '200',
    },
    {
      path: './pretendard/Pretendard-Thin.woff',
      weight: '100',
    },
  ],
  display: 'swap',
});
