export interface FunctionWithArguments {
  (...args: any[]): any;
}

export interface DebouncedFunction<F extends FunctionWithArguments> {
  (...args: Parameters<F>): Promise<ReturnType<F>>;
}

export interface DebouceReturn<F extends FunctionWithArguments> extends Array<DebouncedFunction<F> | VoidFunction> {
  0: DebouncedFunction<F>;
  1: VoidFunction;
}
