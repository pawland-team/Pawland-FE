import { DropdownButton } from '@shared/ui/buttons';

import * as S from './transaction-history-list-style';
import { ReviewWritingArea } from '@widgets/profile-page-review-writing-area';
import { ReviewItem, TransactionItem } from '@entities/profile/ui';

export const TransactionHistoryList = () => {
  return (
    <S.TransactionHistoryList>
      <div className='button-area'>
        <DropdownButton
          dropdownItems={['전체보기', '최신순']}
          lastDropdownItem={'인기순'}
          defaultMenu={'전체보기'}
          iconPath={'images/icon/arrow-down-icon-gray.svg'}
        />
      </div>
      <TransactionItem reviewArea={<ReviewItem />} />
      <TransactionItem reviewArea={<ReviewWritingArea />} />
    </S.TransactionHistoryList>
  );
};
