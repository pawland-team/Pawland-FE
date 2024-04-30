import { MainCategoryItemDto } from '@shared/constants/main-category';
import { CategoryFilter } from '@shared/ui/category-filter';

interface ProductCategoryFilterBoxProps {
  list: MainCategoryItemDto[];
}

const ProductCategoryFilterBox = ({ list }: ProductCategoryFilterBoxProps) => {
  return list.map((category) => <CategoryFilter key={category.id} categoryItem={category} />);
};

export { ProductCategoryFilterBox };
