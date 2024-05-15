import { MutationStatus } from '@tanstack/react-query';
import { styled } from 'styled-components';

import { ProductRegisterButton } from '../product-register-button';
import { ProductTempSaveButton } from '../product-temp-save-button';

interface ProductHeaderButtonContainerProps {
  uniqueFormId: string;
  status: MutationStatus;
}

export const ProductHeaderButtonContainer = ({ status, uniqueFormId }: ProductHeaderButtonContainerProps) => {
  return (
    <S.HeaderButtonContainer>
      <ProductTempSaveButton />
      <ProductRegisterButton uniqueFormId={uniqueFormId} disabled={status === 'pending'} />
    </S.HeaderButtonContainer>
  );
};

const S = {
  HeaderButtonContainer: styled.section`
    display: inline-flex;
    gap: 14px;
  `,
};
