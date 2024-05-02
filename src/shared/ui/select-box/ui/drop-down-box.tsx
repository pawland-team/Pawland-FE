import { ReactNode } from 'react';

import styled from 'styled-components';

import { dropDownMenuStyle } from '../../styles/utills/drop-down-menu';

export interface DropDownBoxDto {
  id: number;
  name: string;
}

interface DropDownBoxProps {
  children: ReactNode;
  maxWidth?: string;
}

const DropDownBox = ({ children, maxWidth = '100%' }: DropDownBoxProps) => {
  return <SDropDownBox $maxWidth={maxWidth}>{children}</SDropDownBox>;
};

export { DropDownBox };

interface SDropDownBoxProps {
  $maxWidth: string;
}

const SDropDownBox = styled.ul<SDropDownBoxProps>`
  ${dropDownMenuStyle}
  position: absolute;
  top: 100%;
  left: 0;
  max-width: ${(props) => props.$maxWidth};
`;
