// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse }           from 'next/server';
import type { NextRequest }       from 'next/server';

const PUBLIC_ROUTES  = ['/', '/auth/login', '/auth/register', '/auth/callback', '/auth/forgot-password'];
const ADMIN_ROUTES   = ['/admin'];

export async function middleware(req: NextRequest) {
  const res      = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  const { pathname } = req.nextUrl;

  // Route admin → vérifier le rôle
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    // TODO: vérifier session.user.user_metadata.role === 'ADMIN'
  }

  // Route dashboard → doit être connecté
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  // Page auth → si déjà connecté, rediriger vers dashboard
  if (['/auth/login', '/auth/register'].includes(pathname) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|screenshots|manifest.json).*)',
  ],
};
