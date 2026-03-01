export const prerender = false;
import type { APIRoute } from 'astro';
import { put } from '@vercel/blob';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const file = form.get('file') as File | null;
  const eventSlug = form.get('eventSlug') as string | null;
  const projectId = form.get('projectId') as string | null;

  if (!file || !eventSlug || !projectId) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() ?? 'png';
  const blob = await put(`screenshots/${eventSlug}/${projectId}.${ext}`, file, {
    access: 'public',
    addRandomSuffix: false,
    token: import.meta.env.BLOB_READ_WRITE_TOKEN,
  });

  return Response.json({ url: blob.url });
};
