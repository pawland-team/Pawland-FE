import { ValidDateUtilFuncArgs } from '@shared/interface/time';

export const formatToMidnightDate = (date: ValidDateUtilFuncArgs) => {
  const processedDate = new Date(date);

  processedDate.setHours(0, 0, 0, 0);

  return processedDate;
};
