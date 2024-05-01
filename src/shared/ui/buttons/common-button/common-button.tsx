import { MouseEvent, ReactNode } from 'react';

import * as S from './common-button-style';

interface CommonButtonProps {
  children: ReactNode;
  handleClick?: (e: MouseEvent<HTMLElement>) => void;
  borderRadius?: string;
  backgroundColor?: string;
  maxWidth?: string;
  fontWeight?: string;
  fontSize?: string;
  fontColor?: string;
  padding?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

/**
 * - 단위까지 다 적어주세요
 * @param children button 안에 들어갈 요소
 * @param handleClick onClick 이벤트
 * @param borderRadius default 6px
 * @param maxWidth default 100%
 * @param fontSize default 1.6rem
 * @param fontColor default #fff
 * @param padding default '10px 0'
 * @param fontWeight default 400
 * @param backgroundColor default #000
 * @param type default 'button'
 * @param disabled default false
 */

const CommonButton = ({
  children,
  handleClick,
  borderRadius = '6px',
  maxWidth = '100%',
  fontSize = '1.6rem',
  backgroundColor = '#000',
  fontColor = '#fff',
  fontWeight = '400',
  type = 'button',
  padding = '10px 0',
  disabled = false,
}: CommonButtonProps) => {
  return (
    <S.CommonButton
      type={type}
      onClick={handleClick}
      $borderRadius={borderRadius}
      $backgroundColor={backgroundColor}
      $fontColor={fontColor}
      $maxWidth={maxWidth}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $padding={padding}
      disabled={disabled}
    >
      {children}
    </S.CommonButton>
  );
};

export { CommonButton };
