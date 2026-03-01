export const prerender = false;
import type { APIRoute } from 'astro';
import { put } from '@vercel/blob';

export const POST: APIRoute = async ({ request }) => {
  const { base64, contentType, eventSlug, projectId } = await request.json();

  if (!base64 || !eventSlug || !projectId) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }

  const token = process.env['BLOB_READ_WRITE_TOKEN'];
  if (!token) {
    return Response.json({ error: 'blob_token_missing' }, { status: 500 });
  }

  const ext = (contentType as string)?.split('/')[1]?.replace('jpeg', 'jpg') ?? 'png';
  const buffer = Buffer.from(base64 as string, 'base64');

  try {
    const blob = await put(`screenshots/${eventSlug}/${projectId}.${ext}`, buffer, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: contentType ?? 'image/png',
      token,
    });
    return Response.json({ url: blob.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[upload] blob error:', msg);
    return Response.json({ error: msg }, { status: 500 });
  }
};
