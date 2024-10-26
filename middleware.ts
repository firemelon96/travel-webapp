import { auth as middleware } from '@/auth';

const isPublicRoutes = ['/'];
const authRoutes = ['/sign-in', '/register'];

export default middleware((req) => {
  if (isPublicRoutes.includes(req.nextUrl.pathname)) return;

  if (!req.auth && !authRoutes.includes(req.nextUrl.pathname)) {
    const newUrl = new URL('/sign-in', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth && authRoutes.includes(req.nextUrl.pathname)) {
    return Response.redirect(new URL('/dashboard', req.nextUrl.origin));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
