export const formatToISOString = (date: Date | string) => {
  return new Date(date).toISOString();
};
