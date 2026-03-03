export const prerender = false;

import type { APIRoute } from 'astro';
import { kv } from '@vercel/kv';
import { isRateLimited, setRateLimit } from '../../../lib/kv';

const VALID_EVENTS = ['buildathon-zero', 'ideen-fuer-tirol'];

export const POST: APIRoute = async ({ request }) => {
  let body: { name?: string; email?: string; consent?: boolean; event?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid_body' }, { status: 400 });
  }

  const { name, email, consent, event } = body;

  if (!name || !email || !consent) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }

  if (!event || !VALID_EVENTS.includes(event)) {
    return Response.json({ error: 'invalid_event' }, { status: 400 });
  }

  // Global dedup — check before rate limiting so repeat visitors see a friendly message
  const dedupKey = `optin:lovable:email:${email.toLowerCase()}`;
  const existing = await kv.get(dedupKey);
  if (existing) {
    return Response.json({ duplicate: true });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (await isRateLimited(ip)) {
    return Response.json({ error: 'rate_limited' }, { status: 429 });
  }

  const entry = {
    name,
    email: email.toLowerCase(),
    timestamp: new Date().toISOString(),
    event,
    source: 'lovable-optin-page',
  };

  await Promise.all([
    kv.set(dedupKey, entry, { ex: 60 * 60 * 24 * 90 }),
    kv.lpush(`optin:lovable:${event}:list`, email.toLowerCase()),
  ]);
  await setRateLimit(ip);

  return Response.json({ success: true });
};
