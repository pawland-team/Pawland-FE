import { ComponentPropsWithoutRef } from 'react';

import styled from 'styled-components';

type InputLabelProps = ComponentPropsWithoutRef<'label'>;

const InputLabel = ({ children, ...rest }: InputLabelProps) => {
  return (
    <S.Label htmlFor='email' {...rest}>
      {children}
    </S.Label>
  );
};

export default InputLabel;

const S = {
  Label: styled.label`
    font-size: 1.4rem;
    font-weight: 4;
    color: var(--black, #000) 00;
  `,
};
