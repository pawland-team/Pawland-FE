import { ValidDateUtilFuncArgs } from '@shared/interface/time';

export const formatDateMillisecondsToZero = (date: ValidDateUtilFuncArgs) => {
  const processedDate = new Date(date);

  processedDate.setMilliseconds(0);

  return processedDate;
};
