import { ResponsiveNumericSizeProperties } from '@shared/interface/style';

/**
 * unit: px
 */
export const MESSAGE_MAX_WIDTH = 275;

export const MESSAGE_MAX_WIDTH_WITH_CONTROLLER = 362;

/**
 * unit: px
 */
export const CHAT_TEXTAREA_SIZE: ResponsiveNumericSizeProperties<{
  onDesktop: {
    height: 28;
    minHeight: 28;
    maxHeight: 140;
  };
}> = {
  onDesktop: {
    height: 28,
    minHeight: 28,
    maxHeight: 140,
  },
};
