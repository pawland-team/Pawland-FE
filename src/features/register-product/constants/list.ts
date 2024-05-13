import {
  CATEGORY,
  Category,
  PRODUCT_CONDITION,
  ProductCondition,
  Region,
  SPECIES,
  Species,
} from '@shared/apis/product-api';

import type { CategoryValue, SpeciesValue, TagValue } from '../model';

interface CreateBaseObject<Id, Name, Value> {
  id: Id;
  name: Name;
  value: Value;
}

const createList = <T extends Record<string, any>>(obj: T) => {
  return Object.keys(obj).map<CreateBaseObject<string, keyof T, T[keyof T]>>((key) => ({
    // id는 딱히 key 안 따라가도 된다.
    id: key,
    name: key,
    value: obj[key],
  }));
};

export const ANIMAL_SORT_LIST: Array<{ id: string; name: Species; value: SpeciesValue }> = Object.keys(SPECIES).map<{
  id: string;
  name: Species;
  value: SpeciesValue;
}>((species) => ({
  id: species as string,
  name: species as Species,
  value: SPECIES[species as keyof typeof SPECIES],
}));

export const CATEGORY_LIST: Array<{ id: string; name: Category; value: CategoryValue }> = Object.keys(CATEGORY).map<{
  id: string;
  name: Category;
  value: CategoryValue;
}>((category) => ({
  id: category as string,
  name: category as Category,
  value: CATEGORY[category as keyof typeof CATEGORY],
}));

/**
 * 18개의 지역을 담은 리스트
 */
export const REGION_LIST: Array<Region> = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
  '해외',
];

export const CONDITION_TAG_LIST: Array<CreateBaseObject<string, ProductCondition, TagValue>> =
  createList(PRODUCT_CONDITION);
