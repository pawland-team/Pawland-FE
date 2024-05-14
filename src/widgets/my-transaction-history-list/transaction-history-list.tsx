import { ReviewItem, TransactionItem } from '@entities/profile/ui';
import { DropdownButton } from '@shared/ui/buttons';
import { ReviewWritingArea } from '@widgets/profile-page-review-writing-area';

import * as S from './transaction-history-list-style';

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