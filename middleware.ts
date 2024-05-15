import { cookies } from 'next/headers';
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
export const middleware = (request: NextRequest, _event: NextFetchEvent) => {
  const { cookies: requestCookies } = request;
  console.log('----------------------Middleware Request COOKIES--------------------------------');
  console.log(requestCookies);

  console.log('----------------------Middleware JWT VALUE--------------------------------');
  const cookiesApi = cookies();
  console.log(cookiesApi.get('jwt')?.value);

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
  // const ACCESS_TOKEN = 'jwt';
  // console.log('middleware가 시작되었습니다.');
  // const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  // if (!accessToken) {
  //   console.log('accessToken이 없습니다.');
  //   // @see URL second argument https://nodejs.org/api/url.html#new-urlinput-base
  //   // @see Conditional Statements https://nextjs.org/docs/app/building-your-application/routing/middleware#conditional-statements
  //   const signPage = new URL('/signin', request.nextUrl.origin);
  //   return NextResponse.redirect(signPage);
  // }
};

export const config = {
  // https://github.com/vercel/next.js/discussions/36308#discussioncomment-3758041
  // matcher solution for public, api, assets and _next exclusion
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
