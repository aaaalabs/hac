export const prerender = false;

import type { APIRoute } from 'astro';
import { loadEvent } from '../../../lib/events';
import { getAllVotes } from '../../../lib/kv';

export const GET: APIRoute = async ({ params }) => {
  const event = await loadEvent(params.event!);
  if (!event) {
    return Response.json({ error: 'not_found' }, { status: 404 });
  }
  const votes = await getAllVotes(
    event.slug,
    event.projects.map(p => p.id),
  );
  return Response.json({ eventSlug: event.slug, votes });
};
