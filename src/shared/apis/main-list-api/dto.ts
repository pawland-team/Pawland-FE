import { Category, ProductCondition, Region, SaleState, Species } from '../product-api/dto';

export interface mainProductInfo {
  /**
   * product Id
   */
  id: number;
  /**
   * 상품이 등록된 카테고리
   */
  category: Category;
  /**
   * 상품 가격
   */
  price: number;
  /**
   * 상품 이름
   */
  productName: string /**
   * 상품 조회수
   */;
  views: number;
  /**
   * 대표 이미지
   */
  imageThumbnail: string;
  /**
   * 찜하기 버튼 상태
   */
  isWished: boolean;
}

export interface ProductListItemDto {
  /**
   * 상품 Id
   */
  id: number;
  /**
   * 판매자 정보
   */
  seller: {
    id: number;
    email: string;
    nickname: string;
  };
  /**
   * 상품 카테고리
   */
  category: Category;
  /**
   * 동물 카테고리
   */
  species: Species;
  /**
   * 상품 상태
   */
  condition: ProductCondition;
  /**
   * 상품명
   */
  name: string;
  /**
   * 상품 가격
   */
  price: number;
  /**
   * 상품 상세 설명
   */
  content: string;
  /**
   * 지역
   */
  region: Region;
  /**
   * 조회수
   */
  view: number;
  /**
   * 판매 상태
   */
  status: SaleState;
  /**
   * 상품 썸네일
   */
  thumbnailImage: string;
  /**
   * 상품 상세 이미지
   */
  images: string[];
  /**
   * 찜상태
   */
  wished: boolean;
}

export interface ProductListDto {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ProductListItemDto[];
  number: number;
  sort: {
    empty: true;
    sorted: true;
    unsorted: true;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: true;
      sorted: true;
      unsorted: true;
    };
    pageSize: number;
    paged: true;
    pageNumber: number;
    unpaged: true;
  };
  first: true;
  last: true;
  empty: true;
}
