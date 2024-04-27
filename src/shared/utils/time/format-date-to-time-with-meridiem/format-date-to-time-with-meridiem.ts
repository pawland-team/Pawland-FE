/**
 * @example
 * ```ts
 * console.log(formatDateToTimeWithMeridiem('2024-04-25T08:48:10.930Z')); // '오후 05:48'
 * ```
 */
export const formatDateToTimeWithMeridiem = (time: Date | string): string => {
  const processedTime = new Date(time);

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const formattedTime = new Intl.DateTimeFormat('ko', options).format(processedTime);

  return formattedTime;
};
