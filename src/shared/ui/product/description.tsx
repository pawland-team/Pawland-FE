import styled from 'styled-components';

import { ProductListItemDto } from '@shared/apis/main-list-api/dto';
import { textLineClamp2 } from '@shared/ui/styles/utills';
import { formatPrice } from '@shared/utils/price';

interface DescriptionProps {
  item: ProductListItemDto;
}

const Description = ({ item }: DescriptionProps) => {
  return (
    <SProductDescription>
      <h4>{item.name}</h4>
      <div className='text-group'>
        <p className='price'>{formatPrice(item.price, false)}</p>
        <span className='view'>조회수 {item.view}</span>
      </div>
    </SProductDescription>
  );
};

export { Description };

const SProductDescription = styled.div`
  padding: 12px 12px 0;
  background: #fff;

  h4 {
    ${textLineClamp2}
    height: 70px;

    font-size: 2.4rem;
    line-height: 34px;
    font-weight: 700;
    word-break: break-all;
    color: #4d5053;
  }

  .text-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: flex-end;
    justify-content: flex-end;

    margin-top: 12px;
  }

  .price {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 42px;
  }

  .view {
    display: block;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }
`;
