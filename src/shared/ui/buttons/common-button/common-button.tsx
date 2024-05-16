import { MouseEvent, ReactNode } from 'react';

import * as S from './common-button-style';

type CommonButtonProps = {
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
  borderColor?: string;
  borderWidth?: string;
  /**
   * Link 태그에서는 사용 불가능
   * @default undefined
   */
  disabled?: boolean;
  /**
   * Link 태그로 사용할 때는 true를 줘야 함
   * @default undefined
   */
  asLink?: boolean;
} & (
  | {
      asLink?: false;
    }
  | {
      asLink: true;
      /**
       * asLink가 true면 href를 넣어주세요
       * Link 태그의 href에 할당됩니다.
       */
      href: string;
      disabled: never;
    }
);

/**
 * - 단위까지 다 적어주세요
 * - borderColor, borderWidth 둘 다 넣어줬을 때에만 border생김
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
 * @param borderColor example '#43ADFF'
 * @param borderWidth example '2px'
 */

const CommonButton = (commonButtonProps: CommonButtonProps) => {
  // 🛡️타입 가드
  const {
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
    borderColor,
    borderWidth,
    disabled,
    asLink,
  } = commonButtonProps;

  // eslint-disable-next-line react/destructuring-assignment
  if (asLink === true && commonButtonProps.href) {
    const { href } = commonButtonProps;

    return (
      <S.CommonLinkButton
        href={href}
        type={type}
        onClick={handleClick}
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
        {children}
      </S.CommonLinkButton>
    );
  }

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
      $borderColor={borderColor}
      $borderWidth={borderWidth}
      disabled={disabled}
    >
      {children}
    </S.CommonButton>
  );
};

export { CommonButton };
