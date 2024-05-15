import { GoDetailButton } from '@features/button/go-detail-button';
import { SmallThumbnail } from '@shared/ui/thumbnails/small-thumbnail';
import { formatPriceToKoStyle } from '@shared/utils/price';
import { formatDateShorter } from '@shared/utils/time';

import * as S from './transaction-item-style';
import { MyTransactionEntity } from '@shared/apis/profile-api';

interface TransactionItemProps {
  reviewArea: React.ReactNode;
  item: MyTransactionEntity;
}

export const TransactionItem = ({ reviewArea, item }: TransactionItemProps) => {
  return (
    <S.TransactionItem>
      <S.ProductArea>
        <SmallThumbnail imageUrl={item.product.thumbnailUrl} />
        <S.ItemInfoArea>
          <span className='saleSate'>판매상품</span>
          <div>
            <h1>{item.product.name}</h1>
            <p className='price'>{formatPriceToKoStyle(item.product.price)}</p>
          </div>
          <div>
            <span>{formatDateShorter(item.product.createAt)}</span>
            <GoDetailButton pageUrl={`/product/${item.product.id}`} />
          </div>
        </S.ItemInfoArea>
      </S.ProductArea>
      {item.orderReviewResponse && reviewArea}
    </S.TransactionItem>
  );
};
