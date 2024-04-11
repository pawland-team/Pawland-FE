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
