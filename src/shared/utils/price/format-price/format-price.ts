import { formatPriceToKoStyle } from '../format-price-to-ko-style';

/**
 * @param price 숫자 넘겨주면 됨. 원화 단위는 없이 출력됨. 0일때는 '무료나눔'텍스트 반환함
 * @param withUnit unit이 true면 1,000원(default) / false 1,000
 */

const formatPrice = (price: number, withUnit = true) => {
  if (price === 0) {
    return '무료 나눔';
  }

  return formatPriceToKoStyle(price, withUnit);
};

export { formatPrice };
