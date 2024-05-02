import { MouseEvent } from 'react';

import Image from 'next/image';

import * as S from './rounded-arrow-button-style';

interface RoundedArrowButtonProps {
  handleClick: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  ButtonSize?: number;
  arrowSize?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  disabled?: boolean;
}

/**
 *
 * @param handleClick onClick 이벤트 핸들러
 * @param ButtonSize 버튼 너비/높이 공통
 * @param arrowSize 화살표 너비/높이 공통
 * @param direction 화살표 방향 default down
 * @param disabled 버튼 활/비활성화 default false
 */

const RoundedArrowButton = ({
  handleClick,
  ButtonSize = 53,
  direction = 'down',
  arrowSize = 20,
  disabled = false,
}: RoundedArrowButtonProps) => {
  return (
    <S.RoundedArrowButtonStyle
      disabled={disabled}
      type='button'
      onClick={handleClick}
      $ButtonSize={ButtonSize}
      $direction={direction}
    >
      <Image src='/images/icon/arrow-down-icon-9E9E9E.svg' alt='화살표 아이콘' width={arrowSize} height={arrowSize} />
    </S.RoundedArrowButtonStyle>
  );
};

export { RoundedArrowButton };
