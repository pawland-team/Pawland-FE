import { ComponentProps, forwardRef } from 'react';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { styled } from 'styled-components';

import { ResponsiveSizeProperties } from '@shared/interface/style';

interface RoundProfileProps extends Omit<ComponentProps<typeof Image>, 'ref'> {
  /**
   * 화면 분기별 사이즈
   */
  size: ResponsiveSizeProperties;
  /**
   * 프로필 이미지에 대한 설명
   */
  alt: string;
  /**
   * 프로필 이미지
   */
  src: string | StaticImport;
}

/**
 * RoundProfile 컴포넌트를 styled 함수로 감싸서 추가 스타일을 적용할 수 있음.(e.g. border-radius, box-shadow 등)
 */
export const RoundProfile = forwardRef<HTMLDivElement | null, RoundProfileProps>(
  ({ size, fill = true, className, ...rest }, ref) => {
    return (
      <S.RoundWrapper $size={size} ref={ref} className={className}>
        <S.RoundImage fill={fill} {...rest} />;
      </S.RoundWrapper>
    );
  },
);

RoundProfile.displayName = 'RoundProfile';

const S = {
  RoundWrapper: styled.div<{ $size: RoundProfileProps['size'] }>`
    position: relative;

    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    /* TODO: 반응형 디자인 생기면 맞춰서 미디어 쿼리 추가 */
    width: ${({ $size }) => $size.onDesktop.width};
    height: ${({ $size }) => $size.onDesktop.height};

    border-radius: 50%;
  `,
  RoundImage: styled(Image)`
    width: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  `,
};
