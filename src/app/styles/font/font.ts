import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: './pretendard/woff/Pretendard-Bold.woff',
      weight: '800',
    },
    {
      path: './pretendard/woff/Pretendard-Bold.woff',
      weight: '700',
    },
    {
      path: './pretendard/woff/Pretendard-SemiBold.woff',
      weight: '600',
    },
    {
      path: './pretendard/woff/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: './pretendard/woff/Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: './pretendard/woff/Pretendard-Light.woff',
      weight: '300',
    },
    {
      path: './pretendard/woff/Pretendard-ExtraLight.woff',
      weight: '200',
    },
    {
      path: './pretendard/woff/Pretendard-Thin.woff',
      weight: '100',
    },
  ],
  display: 'swap',
});
