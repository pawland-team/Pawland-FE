/**
 * @param price 숫자 넘겨주면 됨. 원화 단위는 없이 출력됨. 0일때는 '무료나눔'텍스트 반환함
 * @example '3,000' / '무료나눔'
 */

const formatPrice = (price: number) => {
  if (price === 0) {
    return '무료나눔';
  }

  return price.toLocaleString();
};

export { formatPrice };
