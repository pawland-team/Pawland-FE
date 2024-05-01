import { TransactionItem } from '../../entities/transaction-item/transaction-item';
import { DropdownButton } from '../../shared/ui/buttons/index';
import * as S from './transaction-history-list-style';

export const TransactionHistoryList = () => {
  return (
    <S.TransactionHistoryList>
      <div className='buttonArea'>
        <DropdownButton dropdownItems={['전체보기', '최신순']} lastDropdownItem={'인기순'} defaultMenu={'전체보기'} />
      </div>
      <TransactionItem />
    </S.TransactionHistoryList>
  );
};
