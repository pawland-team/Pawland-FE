import { formatDateToTimeWithMeridiem } from './format-date-to-time-with-meridiem';

describe('format-date-to-time-with-meridiem 함수 테스트', () => {
  test('formatDateToTimeWithMeridiem 함수는 주어진 날짜를 "a hh:mm" 형식으로 반환해야 합니다.', () => {
    // Given
    const date = '2024-04-25T08:48:10.930Z';
    const expected = '오후 05:48';

    // When
    const result = formatDateToTimeWithMeridiem(date);

    // Then
    expect(result).toBe(expected);
  });
});
