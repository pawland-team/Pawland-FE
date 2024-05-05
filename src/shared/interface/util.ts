export type NoInfer<T> = [T][T extends any ? 0 : never];

export type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

export type FastOmit<T extends object, U extends string | number | symbol> = {
  [K in keyof T as K extends U ? never : K]: T[K];
};

export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

export type SetPickedPropToRequired<T extends object, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type RemappedOmit<T, K extends PropertyKey> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
