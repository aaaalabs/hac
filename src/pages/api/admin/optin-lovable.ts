export const prerender = false;

import type { APIRoute } from 'astro';
import { kv } from '@vercel/kv';

const VALID_EVENTS = ['buildathon-zero', 'ideen-fuer-tirol'];

export const GET: APIRoute = async ({ request }) => {
  const eventSlug = new URL(request.url).searchParams.get('event') ?? 'ideen-fuer-tirol';

  if (!VALID_EVENTS.includes(eventSlug)) {
    return Response.json({ error: 'invalid_event' }, { status: 400 });
  }

  const emails = (await kv.lrange(`optin:lovable:${eventSlug}:list`, 0, -1)) as string[];

  // Backward-compat: merge legacy keys for ideen-fuer-tirol
  if (eventSlug === 'ideen-fuer-tirol') {
    const legacy = (await kv.lrange('optin:lovable:list', 0, -1)) as string[];
    emails.push(...legacy);
  }

  const unique = [...new Set(emails)];

  const entries = await Promise.all(
    unique.map(email => kv.get(`optin:lovable:email:${email}`)),
  );

  return Response.json(entries.filter(Boolean));
};
