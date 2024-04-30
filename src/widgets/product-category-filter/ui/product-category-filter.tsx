import { CategoryFilter } from '@shared/ui/category-filter';
import { MainCategoryItemDto } from '@widgets/product-category-filter/product-category-data';

interface ProductCategoryFilterBoxProps {
  list: MainCategoryItemDto[];
}

const ProductCategoryFilterBox = ({ list }: ProductCategoryFilterBoxProps) => {
  return list.map((category) => <CategoryFilter key={category.id} categoryItem={category} />);
};

export { ProductCategoryFilterBox };
