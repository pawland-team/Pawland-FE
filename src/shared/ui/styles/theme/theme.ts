import { zIndex } from '../z-index';

export const theme = {
  deviceSize: {
    mobile: 'screen and (max-width: 768px)',
    tablet: 'screen and (max-width: 1025px)',
  },
  font: {
    pretendard_100: `'Pretendard-100', sans-serif`,
    pretendard_200: `'Pretendard-200', sans-serif`,
    pretendard_300: `'Pretendard-300', sans-serif`,
    pretendard_400: `'Pretendard-400', sans-serif`,
    pretendard_500: `'Pretendard-500', sans-serif`,
    pretendard_600: `'Pretendard-600', sans-serif`,
    pretendard_700: `'Pretendard-700', sans-serif`,
  },
  color: {
    black_000000: '#000000',
    white_FFFFFF: '#FFFFFF',

    yellow_FFB904: '#FFB904',
    red_F5511D: '#F5511D',
    red_FFC2AF: '#FFC2AF',
    blue_2087D6: '#2087D6',
  },
  zIndex,
} as const;

export type CustomTheme = typeof theme;
