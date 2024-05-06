import { mainListData } from '@shared/apis/main-list-api/main-list-mock';
import { ProductFlexList } from '@widgets/product-flex-list';

const CardListWithSortingBox = () => {
  return <ProductFlexList listData={mainListData} />;
};

export { CardListWithSortingBox };
