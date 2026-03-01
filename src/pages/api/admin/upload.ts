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

  const token = process.env['BLOB_READ_WRITE_TOKEN'];
  if (!token) {
    return Response.json({ error: 'blob_token_missing' }, { status: 500 });
  }

  const ext = file.name.split('.').pop() ?? 'png';
  try {
    const blob = await put(`screenshots/${eventSlug}/${projectId}.${ext}`, file, {
      access: 'public',
      addRandomSuffix: false,
      token,
    });
    return Response.json({ url: blob.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[upload] blob error:', msg);
    return Response.json({ error: msg }, { status: 500 });
  }
};
