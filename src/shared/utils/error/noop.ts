/**
 * 에러 객체 버리는 데 사용
 * @example
 * ```ts
 * try {
 *  // do something
 * } catch (e) {
 *  noop();
 * }
 *
 * fetch('https://api.com')
 *  .then((res) => res.json())
 *  .then((data) => {
 *  // do something
 *  })
 *  .catch(noop);
 * ```
 */
export const noop = () => {};
