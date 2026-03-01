export const prerender = false;
import type { APIRoute } from 'astro';
import type { AicEvent } from '../../../lib/events';
import { loadEvent } from '../../../lib/events';
import { kv } from '@vercel/kv';

export const POST: APIRoute = async ({ request }) => {
  const event = (await request.json()) as AicEvent;

  if (!event.slug || !event.title || !event.date) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }

  const existing = await loadEvent(event.slug);
  if (existing) return Response.json({ error: 'slug_exists' }, { status: 409 });

  const newEvent: AicEvent = { ...event, projects: [] };
  await kv.set(`event:${event.slug}`, newEvent);

  // Track KV-only slugs for loadAllEvents()
  const slugs = (await kv.get<string[]>('kv_event_slugs')) ?? [];
  await kv.set('kv_event_slugs', [...slugs, event.slug]);

  return Response.json({ ok: true });
};
