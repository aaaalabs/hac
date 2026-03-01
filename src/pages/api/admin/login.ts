export const prerender = false;
import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { password } = await request.json();

  if (password !== import.meta.env.HACKIN_CREW_PASSWORD) {
    return Response.json({ error: 'wrong_password' }, { status: 401 });
  }

  const token = createHash('sha256')
    .update(`${password}:admin_session`)
    .digest('hex');

  cookies.set('admin_session', token, {
    httpOnly: true,
    maxAge: 8 * 60 * 60,
    path: '/',
    sameSite: 'strict',
  });

  return Response.json({ ok: true });
};
