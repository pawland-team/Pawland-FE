import { ReviewItem, TransactionItem } from '@entities/profile/ui';
import { ReviewWritingArea } from '@widgets/profile-page-review-writing-area';

import * as S from './my-buy-list-style';
import { useGetmyTransactionList } from '@entities/profile/hooks/use-get-my-transaction-list.query';
import { NoProductBox } from '@shared/ui/error';

export const MyBuyList = () => {
  const initialParams = {
    page: 1,
    size: 4,
    type: '구매내역',
  };

  const { data, status } = useGetmyTransactionList(initialParams);

  if (status === 'success') {
    return (
      <S.TransactionHistoryList>
        {data?.content.length === 0 && <NoProductBox />}

        {data.content.map((item) => (
          <TransactionItem
            reviewArea={
              item.orderReviewResponse ? (
                <ReviewItem reviewData={item.orderReviewResponse} buyer={item.buyer} />
              ) : (
                <ReviewWritingArea orderId={item.id} />
              )
            }
            key={item.id}
            item={item}
            itemTitle={'구매상품'}
          />
        ))}
      </S.TransactionHistoryList>
    );
  }
};
