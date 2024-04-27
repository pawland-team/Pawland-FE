/**
 * @description
 * 시간 차이를 milliseconds 단위로 반환하는 함수(반환값 number 타입임)
 */
export const getTimeDiffInMilliseconds = (time: Date | string): number => {
  const now = Date.now();
  const processedTime = new Date(time);

  return now - processedTime.getTime();
};
