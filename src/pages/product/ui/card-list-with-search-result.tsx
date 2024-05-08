import { ProductFlexList } from '@entities/product/ui/product-flex-list';
import { mainListData } from '@shared/apis/product-list-api/main-list-mock';

const CardListWithSearchResult = () => {
  return <ProductFlexList listData={mainListData} />;
};

export { CardListWithSearchResult };
