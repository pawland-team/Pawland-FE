import { ReactNode } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

interface CommonButtonProps {
  children: ReactNode;
  href: string;
  borderRadius?: string;
  backgroundColor?: string;
  maxWidth?: string;
  fontWeight?: string;
  fontSize?: string;
  fontColor?: string;
  padding?: string;
  borderColor?: string;
  borderWidth?: string;
}

/**
 * - 단위까지 다 적어주세요
 * - borderColor, borderWidth 둘 다 넣어줬을 때에만 border생김
 * @param children button 안에 들어갈 요소
 * @param href 이동할 경로 링크
 * @param borderRadius default 6px
 * @param maxWidth default 100%
 * @param fontSize default 1.6rem
 * @param fontColor default #fff
 * @param padding default '10px 0'
 * @param fontWeight default 400
 * @param backgroundColor default #000
 * @param disabled default false
 * @param borderColor example '#43ADFF'
 * @param borderWidth example '2px'
 */

const CommonLink = ({
  children,
  href,
  borderRadius = '6px',
  maxWidth = '100%',
  fontSize = '1.6rem',
  backgroundColor = '#000',
  fontColor = '#fff',
  fontWeight = '400',
  padding = '10px 0',
  borderColor,
  borderWidth,
}: CommonButtonProps) => {
  return (
    <SCommonLink
      $borderRadius={borderRadius}
      $backgroundColor={backgroundColor}
      $fontColor={fontColor}
      $maxWidth={maxWidth}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $padding={padding}
      $borderColor={borderColor}
      $borderWidth={borderWidth}
    >
      <Link href={href}>{children}</Link>
    </SCommonLink>
  );
};

export { CommonLink };

interface CommonLinkStyleProps {
  $borderRadius?: string;
  $backgroundColor?: string;
  $maxWidth?: string;
  $fontSize?: string;
  $fontColor?: string;
  $fontWeight?: string;
  $padding?: string;
  $borderColor?: string;
  $borderWidth?: string;
}

const SCommonLink = styled.div<CommonLinkStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${(props) => props.$maxWidth};

  a {
    width: 100%;

    text-align: center;

    padding: ${(props) => props.$padding};

    font-size: ${(props) => props.$fontSize};
    font-weight: ${(props) => props.$fontWeight};
    color: ${(props) => props.$fontColor};

    background-color: ${(props) => props.$backgroundColor};
    border-radius: ${(props) => props.$borderRadius};

    ${(props) => {
      if (props.$borderColor && props.$borderWidth) {
        return `
        border: ${props.$borderWidth} solid ${props.$borderColor};
      `;
      }
    }}
  }
`;
