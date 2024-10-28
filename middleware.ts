import { auth as middleware } from '@/auth';
import { getToken } from 'next-auth/jwt';
import NextAuth from 'next-auth';
import { revalidatePath } from 'next/cache';

const isPublicRoutes = ['/'];
const authRoutes = ['/sign-in', '/register', '/new-verification'];
const adminRoute = ['/admin/dashboard'];
const userRoute = ['/u'];

export default middleware(async (req) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (isPublicRoutes.includes(req.nextUrl.pathname)) return;

  switch (token?.role) {
    case 'USER':
      if (
        adminRoute.includes(req.nextUrl.pathname) ||
        authRoutes.includes(req.nextUrl.pathname)
      ) {
        const newUrl = new URL(`/u/${token.sub}`, req.nextUrl.origin);
        return Response.redirect(newUrl);
      }
      break;
    case 'ADMIN':
      if (authRoutes.includes(req.nextUrl.pathname)) {
        return Response.redirect(
          new URL('/admin/dashboard', req.nextUrl.origin)
        );
      }
      break;
    default:
      if (!req.auth && !authRoutes.includes(req.nextUrl.pathname)) {
        const newUrl = new URL('/sign-in', req.nextUrl.origin);
        return Response.redirect(newUrl);
      }
  }

  // if (
  //   req.auth &&
  //   authRoutes.includes(req.nextUrl.pathname) &&
  //   token?.role !== 'USER'
  // ) {
  //   return Response.redirect(new URL('/admin/dashboard', req.nextUrl.origin));
  // }

  // if (
  //   token?.role === 'USER' &&
  //   (adminRoute.includes(req.nextUrl.pathname) ||
  //     authRoutes.includes(req.nextUrl.pathname))
  // ) {
  //   const newUrl = new URL(`/u/${token.sub}`, req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }

  // if (!req.auth && !authRoutes.includes(req.nextUrl.pathname)) {
  //   const newUrl = new URL('/sign-in', req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }
});

//TODO: Implement RBAC (role base access control)

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
