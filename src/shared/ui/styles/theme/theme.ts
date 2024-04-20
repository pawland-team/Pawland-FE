import { zIndex } from '../z-index';

export const theme = {
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
