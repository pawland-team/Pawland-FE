import { formatDateMillisecondsToZero } from './format-date-milliseconds-to-zero';

describe('format-date-milliseconds-to-zero 테스트', () => {
  test('formatDateMillisecondsToZero 함수는 주어진 밀리초를 0으로 변환해야 합니다.', () => {
    // Given
    const date = '2024-05-03T15:08:30.456Z';
    const expected = '2024-05-03T15:08:30.000Z';

    // When
    const result = formatDateMillisecondsToZero(date);

    // Then
    expect(result.toISOString()).toBe(expected);
  });
});
