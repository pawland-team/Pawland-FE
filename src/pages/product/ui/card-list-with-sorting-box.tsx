import { ProductFlexList } from '@entities/product-flex-list';
import { mainListData } from '@shared/apis/main-list-api/main-list-mock';

const CardListWithSortingBox = () => {
  return <ProductFlexList listData={mainListData} />;
};

export { CardListWithSortingBox };
