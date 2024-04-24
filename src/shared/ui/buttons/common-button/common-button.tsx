import { MouseEvent, ReactNode } from 'react';

import * as S from './common-button-style';

interface CommonButtonProps {
  children: ReactNode;
  handleClick?: (e: MouseEvent<HTMLElement>) => void;
  borderRadius?: number;
  backgroundColor?: string;
  width?: number;
  fontWeight?: number;
  fontSize?: string;
  fontColor?: string;
  padding?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

/**
 *
 * @param children button 안에 들어갈 요소
 * @param handleClick onClick 이벤트
 * @param {number} borderRadius default 6px (number)
 * @param {number} width default 174px (number)
 * @param {number} fontSize default 1.6rem (number)
 * @param {string} fontColor default #fff (string)
 * @param {string} padding default '10px 0' (string)
 * @param {number} fontWeight default 400 (number)
 * @param {string} backgroundColor default #000 (string)
 * @param {string} type default 'button'
 */

const CommonButton = ({
  children,
  handleClick,
  borderRadius = 6,
  width = 174,
  fontSize = '1.6',
  backgroundColor = '#000',
  fontColor = '#fff',
  fontWeight = 400,
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
      $width={width}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $padding={padding}
    >
      {children}
    </S.CommonButton>
  );
};

export { CommonButton };
