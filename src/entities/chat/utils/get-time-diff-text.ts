import { formatDateShorter, getTimeDiffInMilliseconds } from '@shared/utils/time';

export const getTimeDiffText = (time: Date | string) => {
  const processedTime = new Date(time);
  const dateOfToday = new Date().getDate();
  const dateOfReceivedTime = processedTime.getDate();
  const timeDiffInMilliSeconds = getTimeDiffInMilliseconds(time);
  const isTimeDiffLessThanOneDay = timeDiffInMilliSeconds < 24 * 60 * 60 * 1000;

  // 1. 24시간 이내의 시간 차이면 "어제", "오늘"로 표시
  if (isTimeDiffLessThanOneDay && dateOfReceivedTime === dateOfToday) {
    return '오늘';
  }

  if (isTimeDiffLessThanOneDay && dateOfReceivedTime === dateOfToday - 1) {
    return '어제';
  }

  // 2. 24시간 이후의 시간 차이면 "yyyy.mm.dd"형태로 표시
  return formatDateShorter(time);
};
