import styled from 'styled-components';

import { LinkCopyButton } from '@features/button/link-copy-button';
import { ToggleWishButton } from '@features/product/ui';

interface ProductInteractionButtonsBoxProps {
  id: number;
  isWished: boolean;
}

const ProductInteractionButtonsBox = ({ id, isWished }: ProductInteractionButtonsBoxProps) => {
  return (
    <ProductInteractionButtonsStyle>
      <LinkCopyButton />
      <ToggleWishButton id={id} initialIsWished={isWished} width={21} height={18} />
    </ProductInteractionButtonsStyle>
  );
};

export { ProductInteractionButtonsBox };

const ProductInteractionButtonsStyle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
