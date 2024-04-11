import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import styled from 'styled-components';

import { CommonInput, CommonInputType } from '../common-input';

const withError = (Component: CommonInputType) => {
  const WrappedComponent = forwardRef<ElementRef<CommonInputType>, ComponentPropsWithoutRef<CommonInputType>>(
    ({ children, isError, ...rest }, ref) => (
      <WithErrorWrap>
        <Component ref={ref} isError={isError} {...rest} />
        {isError && children}
      </WithErrorWrap>
    ),
  );

  WrappedComponent.displayName = `withErrorMsg(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

const WithErrorWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.6rem;
  width: 100%;
`;

const InputWithErrorMsg = withError(CommonInput);
InputWithErrorMsg.displayName = 'withErrorMsg(CommonInput)';

export default InputWithErrorMsg;
