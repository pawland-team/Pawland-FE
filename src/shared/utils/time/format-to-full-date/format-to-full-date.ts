/**
 * @example
 * ```ts
 * console.log(formatToFullDate('2024-04-25T08:48:10.930Z')); // '2024년 4월 25일 목요일'
 * ```
 */
export const formatToFullDate = (date: string | Date) => {
  const processedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
  };

  const formattedDate = new Intl.DateTimeFormat('ko', options).format(processedDate);

  return formattedDate;
};
