import { ReactNode } from 'react';

import styled from 'styled-components';

import { dropDownMenuStyle } from '../../styles/utils/drop-down-menu';

export interface DropDownBoxDto {
  id: number;
  name: string;
}

interface DropDownBoxProps {
  children: ReactNode;
  width?: string;
}

const DropDownBox = ({ children, width = '100%' }: DropDownBoxProps) => {
  return <SDropDownBox $width={width}>{children}</SDropDownBox>;
};

export { DropDownBox };

interface SDropDownBoxProps {
  $width: string;
}

const SDropDownBox = styled.ul<SDropDownBoxProps>`
  ${dropDownMenuStyle}
  position: absolute;
  top: 100%;
  left: 0;
  width: ${(props) => props.$width};
`;
