import {
  CATEGORY,
  CategoryValue,
  PRODUCT_CONDITION,
  ProductConditionValue,
  Region,
  SPECIES,
  SpeciesValue,
} from '@shared/apis/product-api';

interface CreateBaseObject<Id, Name, Value> {
  /**
   * map key
   */
  id: Id;
  /**
   * form 필드에 넣을 값
   */
  name: Name;
  /**
   * 화면에 표시할 값
   */
  value: Value;
}

const createList = <T extends Record<string, any>>(obj: T) => {
  return Object.keys(obj).map<CreateBaseObject<string, T[keyof T], T[keyof T]>>((key) => ({
    // 사실 id는 딱히 key 안 따라가도 된다.
    id: obj[key],
    name: obj[key],
    value: obj[key],
  }));
};

export const ANIMAL_SORT_LIST: Array<CreateBaseObject<string, SpeciesValue, SpeciesValue>> = createList(SPECIES);

export const CATEGORY_LIST: Array<CreateBaseObject<string, CategoryValue, CategoryValue>> = createList(CATEGORY);

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

export const CONDITION_TAG_LIST: Array<CreateBaseObject<string, ProductConditionValue, ProductConditionValue>> =
  createList(PRODUCT_CONDITION);
