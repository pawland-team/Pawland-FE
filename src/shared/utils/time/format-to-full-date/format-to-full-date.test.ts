import { formatToFullDate } from './format-to-full-date';

describe('format-to-full-date 테스트', () => {
  test('formatToFullDate 함수는 주어진 날짜를 "2024년 4월 25일 목요일" 형식으로 반환해야 합니다.', () => {
    // Given
    const date = '2024-04-25T08:48:10.930Z';
    const expected = '2024년 4월 25일 목요일';

    // When
    const result = formatToFullDate(date);

    // Then
    expect(result).toBe(expected);
  });
});
