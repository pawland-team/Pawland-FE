import { useEffect } from 'react';

import { debounce, DebouncedFunction, FunctionWithArguments } from '../../utils/debounce';

export const useDebounce = <T extends FunctionWithArguments>(fn: T, wait?: number): DebouncedFunction<T> => {
  const [debouncedFunc, teardown] = debounce<T>(fn, wait);

  useEffect(() => () => teardown(), []);

  return debouncedFunc;
};
