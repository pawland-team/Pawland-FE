import { styled } from 'styled-components';

import { dash, spin } from '@shared/ui/styles/animation';

interface SpinnerProps {
  /**
   * #### Spinner 크기
   * Spinner 크기. string 형태로 단위까지 입력해야 합니다. ex) 50px
   * @default '50px'
   */
  size?: string;
  /**
   * #### Spinner 색상
   * Spinner 색상. string 형태로 입력해야 합니다. hex, rgb 등등 ex) '#000'
   * @default color.gray_9E9E9E : "#9E9E9E"
   */
  color?: string;
}

/**
 * (로딩) Spinner 컴포넌트
 */
export const Spinner = ({ size = '50px', color }: SpinnerProps) => (
  <StCenterAlign>
    <StSpinner $size={size} $color={color} viewBox='0 0 50 50'>
      <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='5' />
    </StSpinner>
  </StCenterAlign>
);

const StCenterAlign = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: fit-content;
  height: 100%;
  min-height: fit-content;
`;

const StSpinner = styled.svg<{ $size: string; $color?: string }>`
  ${spin}
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};

  & .path {
    stroke: ${({ theme: { color }, $color }) => $color ?? color.gray_9E9E9E};
    stroke-linecap: round;
    ${dash}
  }
`;
