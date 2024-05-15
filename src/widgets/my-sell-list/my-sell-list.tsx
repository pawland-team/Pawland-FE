import { ReviewItem, TransactionItem } from '@entities/profile/ui';
import { ReviewWritingArea } from '@widgets/profile-page-review-writing-area';

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
        <div className='button-area'>판매내역</div>
        {data?.length === 0 && <NoProductBox />}
        {data.map((item) => (
          <TransactionItem
            reviewArea={<ReviewItem reviewData={item.orderReviewResponse} buyer={item.buyer} />}
            key={item.id}
            item={item}
          />
        ))}
      </S.TransactionHistoryList>
    );
  }
};
