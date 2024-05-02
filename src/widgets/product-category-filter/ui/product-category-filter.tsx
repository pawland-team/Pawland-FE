import { CategoryFilter } from '@shared/ui/category-filter';
import { MainCategoryItemDto } from '@widgets/product-category-filter/product-category-data';

interface ProductCategoryFilterBoxProps {
  list: MainCategoryItemDto;
}

const ProductCategoryFilterBox = ({ list }: ProductCategoryFilterBoxProps) => {
  return <CategoryFilter key={list.id} categoryItem={list} />;
};

export { ProductCategoryFilterBox };
