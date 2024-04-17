import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const ACCESS_TOKEN = 'custom access token key';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Authorization', `Bearer ${ACCESS_TOKEN}`);

  const testHeaders = new Headers(request.headers);
  testHeaders.set('test', 'test');

  return NextResponse.next({
    // new response header
    headers: testHeaders,
    request: {
      // new request headers
      headers: requestHeaders,
    },
  });
};

export const config = {
  // https://github.com/vercel/next.js/discussions/36308#discussioncomment-3758041
  // matcher solution for public, api, assets and _next exclusion
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
