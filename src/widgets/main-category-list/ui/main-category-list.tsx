import { MouseEvent } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useCheckedCategoryStore } from '@widgets/product-list-filter-container/model';

import * as S from './style';
import { CategoryArray } from '../apis/main-category-data';

interface CategoryListProps {
  categoryList: CategoryArray[];
}

const CategoryList = ({ categoryList }: CategoryListProps) => {
  const { addSelectedValue, clearSelectedValues } = useCheckedCategoryStore();

  const handleClickLink = (e: MouseEvent<HTMLAnchorElement>, group: string) => {
    clearSelectedValues();
    const selectedKeyword = e.currentTarget.querySelector('p')?.innerText;

    if (selectedKeyword) {
      if (selectedKeyword === '기타') {
        return addSelectedValue(group, '그 외 상품', true);
      }

      return addSelectedValue(group, selectedKeyword, true);
    }
  };

  return (
    <S.CategoryList>
      {categoryList.map((category) => (
        <li key={category.id}>
          <Link
            href={`/product?page=1&size=12&${category.group}="${category.name}"&orderBy="최신순"`}
            onClick={(e) => handleClickLink(e, category.group)}
          >
            <Image width={100} height={100} src={category.imageSrc} alt={category.name} />
            <p>{category.name}</p>
          </Link>
        </li>
      ))}
    </S.CategoryList>
  );
};

export { CategoryList };
