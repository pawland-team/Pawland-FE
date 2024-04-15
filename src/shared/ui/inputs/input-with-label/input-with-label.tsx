import { ElementRef, forwardRef, InputHTMLAttributes, PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { AppendedCommonInputProps, CommonInputType } from '../common-input/common-input';
import InputBox from './input-box';
import InputLabel from './input-label';
import InputWithErrorMsg from './input-with-error-message';

type InputWithLabelProps = Omit<UseFormRegisterReturn, 'ref'> &
  PropsWithChildren<
    {
      id: InputHTMLAttributes<HTMLInputElement>['id'];
      placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder'];
      autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
    } & AppendedCommonInputProps & {
        label: string;
      }
  >;

const InputWithLabel = forwardRef<ElementRef<CommonInputType>, InputWithLabelProps>(
  ({ children, label, id, ...rest }, ref) => {
    return (
      <InputBox>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <InputWithErrorMsg ref={ref} id={id} {...rest}>
          {children}
        </InputWithErrorMsg>
      </InputBox>
    );
  },
);

InputWithLabel.displayName = 'InputWithLabel';

export default InputWithLabel;
