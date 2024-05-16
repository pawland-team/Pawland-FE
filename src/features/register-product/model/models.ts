import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import ReactQuill from 'react-quill';

import { CategoryValue, ProductConditionValue, Region, SpeciesValue } from '@shared/apis/product-api';

/**
 * 상품 등록 폼 defaultValues 타입
 *
 * 보내기 전에 변환시켜야 하는 필드들이 있음.
 */
export type RegisterProductForm = {
  /**
   * 상품 가격
   * number type으로 변환시켜야 함
   */
  price: string | null;
  /**
   * 상품 설명
   * quill value
   */
  description: string;
  /**
   * 지역 선택
   */
  selectedRegionCategory: Region | null;
  /**
   * 상품 카테고리 선택
   */
  selectedProductSortCategory: CategoryValue | null;
  /**
   * 동물 카테고리 선택
   */
  selectedSpeciesCategory: SpeciesValue | null;
  /**
   * 상품 상태 선택
   */
  selectedProductConditionTagCategory: ProductConditionValue | null;
  /**
   * 상품 대표 이미지
   * FileList === File[]
   * File[]로 하게 될 경우 빈 배열[]도 허락해버리기 때문에 FileList로 설정
   *
   * - 보내기 전에 string(image url)으로 변환시켜야 함.
   */
  thumbnail: FileList | null | string;
  // thumbnail: FileList;
  /**
   * 상품 설명에 들어있는 이미지 리스트
   *
   * - editor에서 자동으로 image url로 변환되어 들어가기 때문에 변환 필요 없음.
   */
  images: string[];
  /**
   * 상품 제목
   */
  productTitle: string;
};

export interface ProductImageListStoreState {
  /**
   * 한 번이라도 입력했던 이미지 File 리스트: S3 버킷에 저장 요청할(한) 파일 이름이어 함 (string)
   */
  preRegisteredToS3ProductImageList: string[];
  appendPreRegisteredToS3ProductImage: (preRegisteredToS3ProductImage: string) => void;
  clearPreRegisteredToS3ProductImageList: () => void;
}

export type FocusRef = {
  [key in keyof Omit<RegisterProductForm, 'images' | 'description'>]?: HTMLElement;
} & {
  description?: ReactQuill;
};

export type FocusElementFunctionObject = {
  [key in keyof Omit<RegisterProductForm, 'images'>]?: VoidFunction;
};

export type FocusElementFunctionObjectDispatch = Dispatch<SetStateAction<FocusElementFunctionObject | undefined>>;

export interface SetFocusElementFunctionObjectProps {
  setFocusElementFunctionObject: FocusElementFunctionObjectDispatch;
}

export interface FocusRefProps {
  focusRef: MutableRefObject<FocusRef>;
}
