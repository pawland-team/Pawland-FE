import styled from 'styled-components';

import { LinkCopyButton } from './link-copy-button';
import { WishItemButton } from './whish-item-button';

interface ProductInteractionButtonsBoxProps {
  id: number;
  isWished: boolean;
}

const ProductInteractionButtonsBox = ({ id, isWished }: ProductInteractionButtonsBoxProps) => {
  return (
    <ProductInteractionButtonsStyle>
      <LinkCopyButton />
      <WishItemButton id={id} initialIsWished={isWished} width={21} height={18} />
    </ProductInteractionButtonsStyle>
  );
};

export { ProductInteractionButtonsBox };

const ProductInteractionButtonsStyle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
