import { auth as middleware } from '@/auth';
import { getToken } from 'next-auth/jwt';
import NextAuth from 'next-auth';
import { revalidatePath } from 'next/cache';

const publicRoutes = ['/', 'api/uploadthing'];
const authRoutes = ['/sign-in', '/register', '/new-verification'];
const adminRoute = ['/admin/dashboard'];
const userRoute = ['/u'];
const publicPrefix = ['/tours', '/transfers', '/new-verification'];

export default middleware(async (req) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isLoggedIn = !!req.auth;
  const isPublicRoutes = publicRoutes.includes(req.nextUrl.pathname);
  const isAdminRoutes = adminRoute.includes(req.nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(req.nextUrl.pathname);
  const isPublicPrefix = publicPrefix.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isPublicRoutes || isPublicPrefix) return;

  switch (token?.role) {
    case 'USER':
      if (isAdminRoutes || isAuthRoutes) {
        const newUrl = new URL(`/u/${token.sub}`, req.nextUrl.origin);
        return Response.redirect(newUrl);
      }
      break;
    case 'ADMIN':
      if (isAuthRoutes) {
        return Response.redirect(
          new URL('/admin/dashboard', req.nextUrl.origin)
        );
      }
      break;
    default:
      if (!isLoggedIn && !isAuthRoutes) {
        const newUrl = new URL('/sign-in', req.nextUrl.origin);
        return Response.redirect(newUrl);
      }
  }
});

//TODO: Implement RBAC (role base access control)

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
