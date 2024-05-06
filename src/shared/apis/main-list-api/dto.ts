import { Category } from '../product-api/dto';

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
