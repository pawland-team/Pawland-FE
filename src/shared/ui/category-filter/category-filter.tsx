import { MainCategoryItemDto } from '@widgets/product-category-filter/product-category-data';

import * as S from './category-filter-style';
import { CommonCheckBox } from '../checkbox';

interface CategoryFilterProps {
  categoryItem: MainCategoryItemDto;
}

const CategoryFilter = ({ categoryItem }: CategoryFilterProps) => {
  return (
    <>
      <S.CategoryFilterStyle>
        <div className='filter-title'>
          <p>{categoryItem.group}</p>
        </div>
        <div className='filter-checkbox'>
          {categoryItem.item.map((checkbox) => (
            <CommonCheckBox
              key={checkbox.label}
              label={checkbox.label}
              checked={checkbox.checked}
              group={categoryItem.group}
            />
          ))}
        </div>
      </S.CategoryFilterStyle>
    </>
  );
};

export { CategoryFilter };
