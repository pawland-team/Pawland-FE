import { GoDetailButton } from '@features/button/go-detail-button';
import { SmallThumbnail } from '@shared/ui/thumbnails/small-thumbnail';
import { formatPriceToKoStyle } from '@shared/utils/price';
import { formatDateShorter } from '@shared/utils/time';

import * as S from './transaction-item-style';

interface TransactionItemProps {
  reviewArea: React.ReactNode;
}

export const TransactionItem = ({ reviewArea }: TransactionItemProps) => {
  return (
    <S.TransactionItem>
      <S.ProductArea>
        <SmallThumbnail imageUrl='' />
        <S.ItemInfoArea>
          <span className='saleSate'>판매완료</span>
          <div>
            <h1>뽁뽁이 뼈다귀</h1>
            <p className='price'>{formatPriceToKoStyle(30000)}</p>
          </div>
          <div>
            <span>{formatDateShorter('2024-03-12T09:52:06.381Z')}</span>
            <GoDetailButton pageUrl='/' />
          </div>
        </S.ItemInfoArea>
      </S.ProductArea>
      {reviewArea}
    </S.TransactionItem>
  );
};
