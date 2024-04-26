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
}

/**
 * - 단위까지 다 적어주세요
 * @param children button 안에 들어갈 요소
 * @param handleClick onClick 이벤트
 * @param {number} borderRadius default 6px (string)
 * @param {number} maxWidth default 100% (string)
 * @param {number} fontSize default 1.6rem (string)
 * @param {string} fontColor default #fff (string)
 * @param {string} padding default '10px 0' (string)
 * @param {number} fontWeight default 400 (string)
 * @param {string} backgroundColor default #000 (string)
 * @param {string} type default 'button'
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
    >
      {children}
    </S.CommonButton>
  );
};

export { CommonButton };
