import { defineMiddleware } from 'astro:middleware';
import { createHash } from 'node:crypto';

function sessionToken(password: string): string {
  return createHash('sha256').update(`${password}:admin_session`).digest('hex');
}

export const onRequest = defineMiddleware(async ({ url, cookies }, next) => {
  const path = url.pathname;

  // Login page and login API are always public
  if (path === '/admin/login' || path === '/api/admin/login') return next();

  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    const session = cookies.get('admin_session')?.value;
    const expected = sessionToken(import.meta.env.HACKIN_CREW_PASSWORD ?? '');

    if (session !== expected) {
      if (path.startsWith('/api/')) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      return Response.redirect(new URL('/admin/login', url));
    }
  }

  return next();
});
