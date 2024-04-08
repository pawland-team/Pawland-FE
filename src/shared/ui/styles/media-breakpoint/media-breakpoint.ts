import { device } from './device';

/**
 * - PC: 1200px 이상
 * - ~~PC: 1025px 이상~~
 * - Tablet: 768px 이상 ~ 1199px 이하
 * - Mobile: 375px 이상 ~ 767px 이하
 * * `375px 미만 사이즈의 디자인은 고려하지 않습니다`
 *
 * mobile first develop: default mobile
 * */
const mediaBreakpoint = {
  tablet: `screen and (min-width: ${device.tablet}px)`,
  pc: `screen and (min-width: ${device.pc}px)`,
} as const;

export { mediaBreakpoint };
