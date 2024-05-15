import { ReviewItem, TransactionItem } from '@entities/profile/ui';
import { ReviewWritingArea } from '@widgets/profile-page-review-writing-area';

import * as S from './my-buy-list-style';
import { useGetmyTransactionList } from '@entities/profile/hooks/use-get-my-transaction-list.query';

export const MyBuyList = () => {
  const initialParams = {
    page: 1,
    size: 4,
    type: '구매내역',
  };

  const { data, status } = useGetmyTransactionList(initialParams);
  console.log(data, status);

  return (
    <S.TransactionHistoryList>
      <TransactionItem reviewArea={<ReviewItem />} />
      <TransactionItem reviewArea={<ReviewWritingArea />} />
    </S.TransactionHistoryList>
  );
};
