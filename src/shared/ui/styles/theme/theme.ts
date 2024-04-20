import { zIndex } from '../z-index';

export const theme = {
  color: {},
  zIndex,
} as const;

export type CustomTheme = typeof theme;
