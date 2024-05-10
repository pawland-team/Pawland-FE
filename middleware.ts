import { NextFetchEvent, NextRequest } from 'next/server';

/**
 * waitUntil and NextFetchEvent
 * @see https://nextjs.org/docs/pages/building-your-application/routing/middleware#waituntil-and-nextfetchevent
 *
 * The NextFetchEvent object extends the native FetchEvent object, and includes the waitUntil() method.
 * The waitUntil() method takes a promise as an argument, and extends the lifetime of the Middleware until the promise settles. This is useful for performing work in the background.
 *
 * @example
 * ```ts
 * export const middleware = (req: NextRequest, event: NextFetchEvent) => {
 *  event.waitUntil(
 *   new Promise((resolve) => {
 *    setTimeout(() => {
 *    console.log('Hello from the background!');
 *   resolve(undefined);
 *          }, 1000);
 *      });
 *    )
 *  return NextResponse.next();
 * };
 * ```
 */
export const middleware = (_req: NextRequest, _event: NextFetchEvent) => {
  // const { cookies, headers } = request;
  // console.log(cookies);
  // console.log(headers);
  // const ACCESS_TOKEN = 'custom access token key';
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set('Authorization', `Bearer ${ACCESS_TOKEN}`);
  // const testHeaders = new Headers(request.headers);
  // testHeaders.set('test', 'test');
  // return NextResponse.next({
  //   // new response header
  //   headers: testHeaders,
  //   request: {
  //     // new request headers
  //     headers: requestHeaders,
  //   },
  // });
};

export const config = {
  // https://github.com/vercel/next.js/discussions/36308#discussioncomment-3758041
  // matcher solution for public, api, assets and _next exclusion
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
