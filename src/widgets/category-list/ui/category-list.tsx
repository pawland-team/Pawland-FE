import Image from 'next/image';
import Link from 'next/link';

import { CategoryArray } from '../api/dto';
import * as S from './category-list-style';

interface CategoryListProps {
  categoryList: CategoryArray[];
}

const CategoryList = ({ categoryList }: CategoryListProps) => {
  console.log(categoryList);

  return (
    <S.CategoryList>
      {categoryList.map((category) => (
        <li key={category.id}>
          <Link href='/'>
            <Image width={100} height={100} src={category.imageSrc} alt={category.name} />
            <p>{category.name}</p>
          </Link>
        </li>
      ))}
    </S.CategoryList>
  );
};

export { CategoryList };
