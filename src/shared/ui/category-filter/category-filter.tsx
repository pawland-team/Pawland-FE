import { MainCategoryItemDto } from '@shared/constants/main-category';

import { CommonCheckBox } from '../checkbox';
import * as S from './category-filter-style';

interface CategoryFilterProps {
  categoryItem: MainCategoryItemDto;
}

const CategoryFilter = ({ categoryItem }: CategoryFilterProps) => {
  return (
    <>
      <S.CategoryFilterStyle>
        <div className='filter-title'>
          <p>{categoryItem.title}</p>
        </div>
        <div className='filter-checkbox'>
          {categoryItem.item.map((checkbox) => (
            <CommonCheckBox
              key={checkbox.label}
              label={checkbox.label}
              checked={checkbox.checked}
              group={categoryItem.title}
            />
          ))}
        </div>
      </S.CategoryFilterStyle>
    </>
  );
};

export { CategoryFilter };
