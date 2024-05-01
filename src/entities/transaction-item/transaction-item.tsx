import { SmallThumbnail } from '../../shared/ui/thumbnails/small-thumbnail/small-thumbnail';
import * as S from './transaction-item-style';
import { formatDateShorter } from '../../shared/utils/time/format-date-shorter/format-date-shorter';
import { GoDetailButton } from '../../features/button/go-detail-button/go-detail-button';
import { ReviewItem } from '../review-item/review-item';
import { ReviewWritingArea } from '../../widgets/review-writing-area/review-writing-area';
import { formatPrice } from '../../shared/utils/price/index';

export const TransactionItem = () => {
  return (
    <S.TransactionItem>
      <S.ProductArea>
        <SmallThumbnail />
        <S.ItemInfoArea>
          <span className='saleSate'>판매완료</span>
          <div>
            <h1>뽁뽁이 뼈다귀</h1>
            <p className='price'>{formatPrice(30000)}원</p>
          </div>
          <div>
            <span>{formatDateShorter('2024-03-12T09:52:06.381Z')}</span>
            <GoDetailButton />
          </div>
        </S.ItemInfoArea>
      </S.ProductArea>
      <ReviewWritingArea />

      <ReviewItem />
    </S.TransactionItem>
  );
};
