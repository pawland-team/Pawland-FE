import { ValidDateUtilFuncArgs } from '@shared/interface/time';

import { formatDateMillisecondsToZero } from '../format-date-milliseconds-to-zero';
import { formatDateWithTime } from '../format-date-with-time';
import { formatToFullDate } from '../format-to-full-date';
import { formatToMidnightDate } from '../format-to-midnight-date';

interface TargetDateCompareInfo {
  fullDate: Date;
  /**
   * 00:00:00.000으로 변환된 날짜
   */
  midnightDate: Date;
  date: string;
  time: string;
  /**
   * 밀리초를 0으로 만든 날짜
   */
  dateWithMillisecondsZero: Date;
  /**
   * @see {@link formatToFullDate}
   */
  fullDateStringWithKoreaStyle: string;
}

interface CompareDateResult {
  /**
   * 날짜만 비교했을 때 차이 여부
   * 날짜 변환 메시지 디스플레이 표시[삽입] 여부에 사용할 수 있다.
   */
  isDifferentDate: boolean;
  /**
   * 날짜를 포함한 전체 시간을 분 단위까지 비교했을 때 차이 여부
   */
  isDifferentTime: boolean;
  /**
   * 최근 날짜와 시간
   */
  latestDateInfo: TargetDateCompareInfo;
  /**
   * (latestDate보다) 오래된 날짜와 시간
   */
  oldDateInfo: TargetDateCompareInfo;
}

export const compareDate = (latestDate: ValidDateUtilFuncArgs, oldDate: ValidDateUtilFuncArgs): CompareDateResult => {
  const fullDateForLatest = new Date(latestDate);
  const fullDateForOld = new Date(oldDate);
  const latest = formatDateWithTime(fullDateForLatest);
  const old = formatDateWithTime(fullDateForOld);
  const midnightDateForLatest = formatToMidnightDate(fullDateForLatest);
  const midnightDateForOld = formatToMidnightDate(fullDateForOld);
  const dateWithMillisecondsZeroForLatest = formatDateMillisecondsToZero(fullDateForLatest);
  const dateWithMillisecondsZeroForOld = formatDateMillisecondsToZero(fullDateForOld);
  const fullDateStringWithKoreaStyleForLatest = formatToFullDate(fullDateForLatest);
  const fullDateStringWithKoreaStyleForOld = formatToFullDate(fullDateForOld);

  const [latestDatePart, latestTimePart] = latest.split(' ', 2);
  const [oldDatePart, oldTimePart] = old.split(' ', 2);
  const isDifferentDate: CompareDateResult['isDifferentDate'] = latestDatePart !== oldDatePart;
  const isDifferentTime: CompareDateResult['isDifferentTime'] = latest !== old;

  return {
    isDifferentDate,
    isDifferentTime,
    latestDateInfo: {
      date: latestDatePart,
      time: latestTimePart,
      fullDate: fullDateForLatest,
      midnightDate: midnightDateForLatest,
      dateWithMillisecondsZero: dateWithMillisecondsZeroForLatest,
      fullDateStringWithKoreaStyle: fullDateStringWithKoreaStyleForLatest,
    },
    oldDateInfo: {
      date: oldDatePart,
      time: oldTimePart,
      fullDate: fullDateForOld,
      midnightDate: midnightDateForOld,
      dateWithMillisecondsZero: dateWithMillisecondsZeroForOld,
      fullDateStringWithKoreaStyle: fullDateStringWithKoreaStyleForOld,
    },
  } satisfies CompareDateResult;
};
