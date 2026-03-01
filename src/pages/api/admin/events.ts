export const prerender = false;
import type { APIRoute } from 'astro';
import type { AicEvent } from '../../../lib/events';
import { getJsonFile, putJsonFile } from '../../../lib/github';

export const POST: APIRoute = async ({ request }) => {
  const event = (await request.json()) as AicEvent;

  if (!event.slug || !event.title || !event.date) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }

  const path = `src/content/events/${event.slug}.json`;

  // Don't overwrite existing events
  const existing = await getJsonFile(path);
  if (existing) return Response.json({ error: 'slug_exists' }, { status: 409 });

  const newEvent: AicEvent = { ...event, projects: [] };

  const ok = await putJsonFile(path, newEvent, `feat: add event "${event.title}"`);
  if (!ok) return Response.json({ error: 'github_error' }, { status: 500 });
  return Response.json({ ok: true });
};
