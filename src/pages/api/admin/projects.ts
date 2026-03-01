export const prerender = false;
import type { APIRoute } from 'astro';
import type { AicEvent, Project } from '../../../lib/events';
import { getJsonFile, putJsonFile } from '../../../lib/github';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { eventSlug, project } = body as { eventSlug: string; project: Project };

  if (!eventSlug || !project?.id || !project?.name) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }

  const path = `src/content/events/${eventSlug}.json`;
  const file = await getJsonFile<AicEvent>(path);
  if (!file) return Response.json({ error: 'event_not_found' }, { status: 404 });

  const { data: event, sha } = file;

  if (event.projects.some((p) => p.id === project.id)) {
    return Response.json({ error: 'project_id_exists' }, { status: 409 });
  }

  event.projects.push(project);

  const ok = await putJsonFile(
    path,
    event,
    `feat: add project "${project.name}" to ${eventSlug}`,
    sha,
  );

  if (!ok) return Response.json({ error: 'github_error' }, { status: 500 });
  return Response.json({ ok: true });
};
