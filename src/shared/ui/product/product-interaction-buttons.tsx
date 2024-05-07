import styled from 'styled-components';

import { LinkCopyButton } from './link-copy-button';
import { WishItemButton } from './whish-item-button';

interface ProductInteractionButtonsBoxProps {
  isWished: boolean;
}

const ProductInteractionButtonsBox = ({ isWished }: ProductInteractionButtonsBoxProps) => {
  return (
    <ProductInteractionButtonsStyle>
      <LinkCopyButton />
      <WishItemButton isWished={isWished} width={21} height={18} />
    </ProductInteractionButtonsStyle>
  );
};

export { ProductInteractionButtonsBox };

const ProductInteractionButtonsStyle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
