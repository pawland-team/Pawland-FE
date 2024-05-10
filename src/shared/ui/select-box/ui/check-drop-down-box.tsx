import { ReactNode } from 'react';

import styled from 'styled-components';

import { checkDropDownBoxStyle } from '@shared/ui/styles/utils/drop-down-menu';

interface CheckDropDownBoxProps {
  children: ReactNode;
  width?: string;
  ariaLabelledBy: string;
}

const CheckDropDownBox = ({ children, width = '100%', ariaLabelledBy }: CheckDropDownBoxProps) => {
  return (
    <SCheckDropDownBox $width={width} role='group' aria-labelledby={ariaLabelledBy}>
      {children}
    </SCheckDropDownBox>
  );
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
