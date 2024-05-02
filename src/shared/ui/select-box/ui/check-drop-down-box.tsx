import { ReactNode } from 'react';

import styled from 'styled-components';

import { checkDropDownBoxStyle } from '@shared/ui/styles/utills/drop-down-menu';

export interface CheckDropDownBoxDto {
  id: number;
  name: string;
}

interface CheckDropDownBoxProps {
  children: ReactNode;
  width?: string;
}

const CheckDropDownBox = ({ children, width = '100%' }: CheckDropDownBoxProps) => {
  return <SCheckDropDownBox $width={width}>{children}</SCheckDropDownBox>;
};

export { CheckDropDownBox };

interface SCheckDropDownBoxProps {
  $width: string;
}

const SCheckDropDownBox = styled.ul<SCheckDropDownBoxProps>`
  ${checkDropDownBoxStyle}
  position: absolute;
  top: 100%;
  left: 0;
  width: ${(props) => props.$width};
`;
