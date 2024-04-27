import { formatPriceToKoStyle } from './format-price-to-ko-style';

describe('formatPriceToKoStyle 테스트', () => {
  test('formatPriceToKoStyle 함수는 주어진 가격을 "1,000원" 형식으로 반환해야 합니다.', () => {
    // Given
    const price = 1000;
    const expected = '1,000원';

    // When
    const result = formatPriceToKoStyle(price);

    // Then
    expect(result).toBe(expected);
  });

  test('formatPriceToKoStyle 함수는 주어진 가격을 "10,000원" 형식으로 반환해야 합니다.', () => {
    // Given
    const price = 10000;
    const expected = '10,000원';

    // When
    const result = formatPriceToKoStyle(price);

    // Then
    expect(result).toBe(expected);
  });

  test('formatPriceToKoStyle 함수는 주어진 가격을 "100,000" 형식으로 반환해야 합니다.', () => {
    // Given
    const price = 100000;
    const expected = '100,000';

    // When
    const result = formatPriceToKoStyle(price, false);

    // Then
    expect(result).toBe(expected);
  });
});
