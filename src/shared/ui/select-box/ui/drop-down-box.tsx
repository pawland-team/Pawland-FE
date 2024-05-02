import { ReactNode } from 'react';

import styled from 'styled-components';

import { dropDownMenuStyle } from '../../styles/utills/drop-down-menu';

export interface DropDownBoxDto {
  id: number;
  name: string;
}

interface DropDownBoxProps {
  children: ReactNode;
}

const DropDownBox = ({ children }: DropDownBoxProps) => {
  return <SDropDownBox>{children}</SDropDownBox>;
};

export { DropDownBox };

const SDropDownBox = styled.ul`
  ${dropDownMenuStyle}
  position: absolute;
  top: 100%;
  left: 0;
`;
