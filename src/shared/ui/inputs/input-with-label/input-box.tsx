import { PropsWithChildren } from 'react';

import styled from 'styled-components';

type InputBoxProps = PropsWithChildren;

const InputBox = ({ children }: InputBoxProps) => {
  return <S.Box>{children}</S.Box>;
};

export default InputBox;

const S = {
  Box: styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.2rem;
    width: 100%;
  `,
};
