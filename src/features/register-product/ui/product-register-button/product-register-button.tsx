import { styled } from 'styled-components';

import { useMakeRipple } from '@shared/hooks/use-ripple-button';
import { grapRipple, ripple } from '@shared/ui/styles/animation';

interface ProductRegisterButtonProps {
  uniqueFormId: string;
  disabled?: boolean;
}

export const ProductRegisterButton = ({ uniqueFormId, disabled }: ProductRegisterButtonProps) => {
  const { rippleBtnRef } = useMakeRipple();

  // form 태그 안에 있는 것이 아니라서 button type으로 설정
  return (
    <S.RegisterButton disabled={disabled} ref={rippleBtnRef} type='submit' form={uniqueFormId}>
      상품 등록
    </S.RegisterButton>
  );
};

const S = {
  RegisterButton: styled.button`
    ${grapRipple}
    display: flex;
    align-items: center;
    justify-content: center;

    width: 174px;
    height: 40px;
    padding: 10px 32px;

    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2rem; /* 125% */
    color: #fff;
    text-align: center;

    background: ${({ disabled, theme: { color } }) => (disabled ? color.gray_9E9E9E : color.blue_43ADFF)};
    border-radius: 6px;

    ${ripple}
  `,
};
