import { useEffect, useRef } from 'react';

/**
 * TODO: ripple size를 조절할 수 있는 프로퍼티 반환해도 될 듯
 * - ripple size 조절하는 프로퍼티 반환해서 span 태그에 사용할 수 있도록
 * ripple css함수를 button에 주입해야 한다.
 * - button 에는 overflow: hidden; 속성과 position: relative | absolute 등;
 * position absolute를 가둘 수 있는 속성이 필요하다.
 *
 * @example
 *
 * ```ts
 *
 * import { grapRipple, ripple } from '@shared/ui/styles/animation';
 *
 *  const Button = styled.button`
 *  // ...some button styles
 * ${grapRipple} // ripple 효과를 버튼 내부로 잡아줄 수 있는 css 주입(optional하다)
 *
 *  ${ripple} // ripple css 함수 주입
 * `;
 * ```
 */
export const useMakeRipple = () => {
  const rippleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (rippleBtnRef.current === null) {
      return;
    }

    const rippleBtnRefCurrent = rippleBtnRef.current;

    function makeRipple(e: MouseEvent) {
      if (!e.target) {
        return;
      }

      const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
      // const x = e.clientX - (e.target as HTMLButtonElement).offsetLeft;
      // const y = e.clientY - (e.target as HTMLButtonElement).clientTop;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripples = document.createElement('span');
      ripples.className = 'ripple';
      ripples.style.left = `${x}px`;
      ripples.style.top = `${y}px`;

      rippleBtnRefCurrent.appendChild(ripples);

      setTimeout(() => {
        rippleBtnRefCurrent.removeChild(ripples);
      }, 1000);
    }

    rippleBtnRefCurrent.addEventListener('click', makeRipple);

    return () => {
      if (rippleBtnRefCurrent) {
        rippleBtnRefCurrent.removeEventListener('click', makeRipple);
      }
    };
  }, []);

  return {
    rippleBtnRef,
  };
};
