import styled from 'styled-components';

import { LinkCopyButton } from './link-copy-button';
import { WishItemButton } from './whish-item-button';

const ProductInteractionButtonsBox = () => {
  return (
    <ProductInteractionButtonsStyle>
      <LinkCopyButton />
      <WishItemButton isWished={false} width={21} height={18} />
    </ProductInteractionButtonsStyle>
  );
};

export { ProductInteractionButtonsBox };

const ProductInteractionButtonsStyle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
