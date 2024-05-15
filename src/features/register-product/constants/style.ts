import { ResponsiveNumericSizeProperties } from '@shared/interface/style';

export const REGISTER_PRODUCT_CONTENT_SIZE: ResponsiveNumericSizeProperties<{
  onDesktop: { width: 1200; maxWidth: 1200 };
}> = {
  onDesktop: {
    width: 1200,
    maxWidth: 1200,
  },
};

export const REGISTER_PRODUCT_HEADER_SIZE: ResponsiveNumericSizeProperties<{
  onDesktop: { width: 1192; maxWidth: 1192; height: 52 };
}> = {
  onDesktop: {
    maxWidth: 1192,
    width: 1192,
    height: 52,
  },
};
