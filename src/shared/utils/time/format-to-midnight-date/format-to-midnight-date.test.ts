import { formatToMidnightDate } from './format-to-midnight-date';
import { formatToFullDate } from '../format-to-full-date';

describe('format-to-midnight-date 테스트', () => {
  test('formatToMidnightDate 함수는 주어진 날짜를 자정으로 변환해야 합니다.', () => {
    // Given
    const date = '2024-05-03T15:08:30.000Z';
    const expected = '2024-05-03T15:00:00.000Z';

    // When
    const result = formatToMidnightDate(date);

    // Then
    expect(result.toISOString()).toBe(expected);
  });

  test('formatToMidnightDate 함수는 주어진 날짜를 자정으로 변환해야 합니다.', () => {
    // Given
    const date = new Date();
    const expected = new Date(date);

    expected.setHours(0, 0, 0, 0);

    // When
    const result = formatToMidnightDate(date);

    // Then
    expect(result.toISOString()).toBe(expected.toISOString());
  });

  test('formatToMidnightDate 함수는 주어진 날짜를 자정으로 변환해야 합니다.', () => {
    // Given
    const date = '2024-05-03T15:08:30.000Z';
    const expected = '2024년 5월 4일 토요일';

    // When
    const result = formatToMidnightDate(date);

    // Then
    expect(formatToFullDate(result)).toBe(expected);
  });
});
