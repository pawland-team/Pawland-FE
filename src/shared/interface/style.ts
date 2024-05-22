export type RGB = `rgb(${number}, ${number}, ${number})`;

export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

export type HEX = `#${string | number}`;

export type Color = RGB | HEX | RGBA;

interface Size {
  width?: string;
  height?: string;
}

interface NumericSizeLimit {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface NumericSize extends NumericSizeLimit {
  width?: number;
  height?: number;
}

export type DesktopFirstResponsiveUtility<T extends NonNullable<unknown>> =
  | T
  | { onDesktop: T; onTablet?: T; onMobile?: T };

export type DropPrimitiveTypeFromResponsiveStyleUtility<T> =
  T extends DesktopFirstResponsiveUtility<infer U> ? { onDesktop: U; onTablet?: U; onMobile?: U } : T;

/**
 * ### desktop first unit utility
 *
 *
 * 원시 유형 또는 onDesktop, onTablet, onMobile이라는 선택적 속성을 가진 객체를 지정할 수 있습니다.
 * onTablet, onMobile 단위를 지정하지 않으면 onDesktop에 지정된 단위가 모든 장치에 적용됩니다.
 */
export type ResponsiveUnitUtility = DesktopFirstResponsiveUtility<string>;

/**
 * ### desktop first boolean utility
 *
 * 원시 유형 또는 onDesktop, onTablet, onMobile이라는 선택적 속성을 가진 객체를 지정할 수 있습니다.
 * onTablet, onMobile 불리언을 지정하지 않으면 onDesktop에 지정된 불리언이 모든 장치에 적용됩니다.
 */
export type ResponsiveBooleanUtility = DesktopFirstResponsiveUtility<boolean>;

/**
 * @example
 * ```ts
 * const globalNavBar: ResponsiveSizeProperties<{ onDesktop: { height: '80px' } }> = {
 *  onDesktop: {
 *   height: '80px',
 *  },
 * };
 * ```
 */
export type ResponsiveSizeProperties<
  KnownSizeProperty extends
    DropPrimitiveTypeFromResponsiveStyleUtility<Size> = DropPrimitiveTypeFromResponsiveStyleUtility<Size>,
> = KnownSizeProperty;

/**
 * @example
 * ```ts
 * const globalNavBar: ResponsiveNumericSizeProperties<{ onDesktop: { height: 80 } }> = {
 *  onDesktop: {
 *    height: 80,
 *  },
 * };
 * ```
 */
export type ResponsiveNumericSizeProperties<
  KnownSizeProperty extends
    DropPrimitiveTypeFromResponsiveStyleUtility<NumericSize> = DropPrimitiveTypeFromResponsiveStyleUtility<NumericSize>,
> = KnownSizeProperty;
