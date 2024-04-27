/**
 * @example
 * ```ts
 * formatPriceToKoStyle(1000); // 1,000원
 * formatPriceToKoStyle(1000, true); // 1,000원
 * formatPriceToKoStyle(1000, false); // 1,000
 * ```
 */
export const formatPriceToKoStyle = (price: number, withUnit = true) => {
  const options: Intl.NumberFormatOptions = {
    currency: 'KRW',
  };

  return `${new Intl.NumberFormat('ko', options).format(price)}${withUnit ? '원' : ''}`;
};
