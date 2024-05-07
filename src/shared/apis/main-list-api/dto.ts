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

export interface ProductListDto {
  totalPages: number;
  totalElements: number;
  size: number;
  content: [
    {
      id: number;
      seller: {
        id: number;
        email: string;
        nickname: string;
      };
      category: Category;
      species: Species;
      condition: ProductCondition;
      name: string;
      price: number;
      content: string;
      region: Region;
      view: number;
      status: SaleState;
      thumbnailUrl: string;
      imageUrls: string[];
    },
  ];
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
