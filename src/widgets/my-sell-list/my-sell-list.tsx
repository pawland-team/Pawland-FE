import { ReviewItem, TransactionItem } from '@entities/profile/ui';

import * as S from './my-sell-list-style';
import { useGetmyTransactionList } from '@entities/profile/hooks/use-get-my-transaction-list.query';
import { NoProductBox } from '@shared/ui/error';

export const MySellList = () => {
  const initialParams = {
    page: 1,
    size: 4,
    type: '판매내역',
  };

  const { data, status } = useGetmyTransactionList(initialParams);

  if (status === 'success') {
    return (
      <S.TransactionHistoryList>
        {data?.content.length === 0 && <NoProductBox />}
        {data.content.map((item) => (
          <TransactionItem
            reviewArea={
              item.orderReviewResponse ? <ReviewItem reviewData={item.orderReviewResponse} buyer={item.buyer} /> : null
            }
            key={item.id}
            item={item}
            itemTitle={'판매상품'}
          />
        ))}
      </S.TransactionHistoryList>
    );
  }
};
