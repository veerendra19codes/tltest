// import { getSession } from 'next-auth';
import { NextResponse } from 'next/server'

export function middleware(request) {

    const cookies = request.cookies.get("next-auth.session-token");
    // console.log("cookies:", cookies.value);
    
    let isAuthenticated = cookies?.value || '';
    // Check if session token cookie exists
    // console.log("isAuthenticated:", isAuthenticated);

    const path = request.nextUrl.pathname;
    // console.log("path", path);

    if ((isAuthenticated === '')  && (path !== '/login')) {
        // Redirect to login if user is not authenticated and not already on the login page
        return NextResponse.redirect(new URL('/login', request.url));
    }

    else if((isAuthenticated !== '') && (path === '/login')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Continue with the request if user is authenticated or on the login page
    return null;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',

    '/addnewemployee',
    '/dashboardad',
    '/edit',

    '/new',
    '/dashboardbd',

    '/mails',
    '/dashboardsh',

    '/assign',
    '/dashboardtl',
    '/franchise',

    '/dashboardfr',

    '/login',
  ]

}