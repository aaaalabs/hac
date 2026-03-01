export const prerender = false;
import type { APIRoute } from 'astro';
import type { Project } from '../../../lib/events';
import { loadEvent } from '../../../lib/events';
import { kv } from '@vercel/kv';

// POST — add new project
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { eventSlug, project } = body as { eventSlug: string; project: Project };

  if (!eventSlug || !project?.id || !project?.name) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }

  const event = await loadEvent(eventSlug);
  if (!event) return Response.json({ error: 'event_not_found' }, { status: 404 });

  if (event.projects.some((p) => p.id === project.id)) {
    return Response.json({ error: 'project_id_exists' }, { status: 409 });
  }

  event.projects.push(project);
  await kv.set(`event:${eventSlug}`, event);

  return Response.json({ ok: true });
};

// PATCH — update screenshotPath on existing project
export const PATCH: APIRoute = async ({ request }) => {
  const { eventSlug, projectId, screenshotPath } = await request.json();

  if (!eventSlug || !projectId || !screenshotPath) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }

  const event = await loadEvent(eventSlug);
  if (!event) return Response.json({ error: 'event_not_found' }, { status: 404 });

  const project = event.projects.find((p) => p.id === projectId);
  if (!project) return Response.json({ error: 'project_not_found' }, { status: 404 });

  project.screenshotPath = screenshotPath;
  await kv.set(`event:${eventSlug}`, event);

  return Response.json({ ok: true });
};
