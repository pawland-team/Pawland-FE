import { DropdownButton } from '@shared/ui/buttons';
import * as S from './transaction-history-list-style';
import { TransactionItem } from '@entities/transaction-item';

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
      <TransactionItem />
    </S.TransactionHistoryList>
  );
};
