import { cloneElement, PropsWithChildren, ReactElement } from 'react';

interface MultiProviderProps {
  providers: ReactElement[];
}

/**
 * @example
 * ```tsx
 * <MultiProvider providers={[<Provider1 />, <Provider2 />]}>
 *  <App />
 * </MultiProvider>
 * ```
 *
 * @description
 * 위 예시는 아래와 같은 효과를 냅니다.
 *
 * ```tsx
 * <Provider1>
 *  <Provider2>
 *    <App />
 *  </Provider2>
 * </Provider1>
 * ```
 */
export const MultiProvider = ({ providers, children }: PropsWithChildren<MultiProviderProps>) => {
  return (
    <>
      {providers.reduceRight((accProviers, provider) => {
        return cloneElement(provider, {}, accProviers);
      }, children)}
    </>
  );
};
