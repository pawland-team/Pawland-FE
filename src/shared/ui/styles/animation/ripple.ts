import { css, keyframes } from 'styled-components';

const rippleSize = css`
  width: 500px;
  height: 500px;
`;

const rippleAnimate = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

/**
 * ripple 효과를 버튼 내부로 잡아줄 수 있는 css 주입(optional하다)
 */
export const grapRipple = css`
  position: relative;
  overflow: hidden;
`;

/**
 * ## ripple 효과.
 * - absolute 속성을 가지고 있기 때문에 부모 요소에는 이를 잡아줄 수 있는 position이 필요하다.
 * - 부모 요소에 직접 position과 overflow:hidden 속성을 주거나 {@link grapRipple}을 사용해서 잡아줄 수 있다.
 */
export const ripple = css`
  span.ripple {
    pointer-events: none;

    position: absolute;
    transform: scale(0);
    translate: -50% -50%;

    background: #fff;
    ${rippleSize}
    border-radius: 50%;

    animation: ${rippleAnimate} 1s linear infinite;
  }
`;
