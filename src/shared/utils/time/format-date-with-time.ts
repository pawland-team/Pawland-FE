/**
 * @description
 * - 날짜와 시간 사이에 공백이 있는 형태로 반환한다.
 *    - e.g. 2024.03.02 22:52
 * - 날짜는 2024.03.02 형태로 반환하고 시간은 09:52 형태로 반환한다.
 *    - 분 단위까지만 출력한다.
 * - formatDateWithTime으로 변환된 날짜는 new Date()로 다시 변환 가능하다.
 *
 * @exmaple
 * ```ts
 * const date = new Date();
 * const formattedDate = formatDateWithTime(date);
 * console.log(formattedDate); // 2024.03.02 22:52
 *
 * const date2 = '2024-03-02T22:52:00.000Z';
 * const formattedDate2 = formatDateWithTime(date2);
 * console.log(formattedDate2); // 2024.03.02 22:52
 * ```
 *
 */
export const formatDateWithTime = (date: string | Date) => {
  const processedDate = new Date(date);

  const dateOption: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const timeOption: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  };

  // date format: 2024.03.02
  const formattedDate = Intl.DateTimeFormat('ko', dateOption).format(processedDate).replace(/\s/g, '').substring(0, 10);
  // time format: 09:52
  const formattedTime = Intl.DateTimeFormat('ko', timeOption).format(processedDate).replace(/\s/g, '');

  return `${formattedDate} ${formattedTime}`;
};
