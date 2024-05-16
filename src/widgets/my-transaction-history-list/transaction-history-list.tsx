import * as S from './transaction-history-list-style';
import { useGetmyTransactionList } from '@entities/profile/hooks/use-get-my-transaction-list.query';
import { TransactionTapMenuBar } from '@widgets/Transaction-tap-menu-bar';
import { useActiveMenuStore } from '@shared/store/use-active-menu-store';
import { MyBuyList } from '@widgets/my-buy-list';
import { MySellList } from '@widgets/my-sell-list';

interface ActiveMenuState {
  activeMenu: string;
}

export const TransactionHistoryList = () => {
  const initialParams = {
    page: 1,
    size: 4,
    type: '',
  };

  const activeMenu = useActiveMenuStore((state: ActiveMenuState) => state.activeMenu);

  const { data, status } = useGetmyTransactionList(initialParams);
  console.log(data, status);

  const renderComponent = () => {
    switch (activeMenu) {
      case 'buy':
        return <MyBuyList />;
      case 'sell':
        return <MySellList />;

      default:
        return <MyBuyList />;
    }
  };

  return (
    <S.TransactionHistoryList>
      <div className='button-area'>
        <TransactionTapMenuBar />
      </div>
      {renderComponent()}
    </S.TransactionHistoryList>
  );
};
