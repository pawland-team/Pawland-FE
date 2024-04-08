import { DebouceReturn, DebouncedFunction, FunctionWithArguments } from './types';

export const debounce = <T extends FunctionWithArguments>(callback: T, wait?: number): DebouceReturn<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debouncedFunc: DebouncedFunction<T> = (...args) =>
    new Promise((resolve) => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => resolve(callback(...(args as unknown[]))), wait);
    });

  const teardown: VoidFunction = () => {
    clearTimeout(timer);
  };

  return [debouncedFunc, teardown];
};
