export const prerender = false;

import type { APIRoute } from 'astro';
import { loadEvent, findProject, isVotingOpen } from '../../lib/events';
import { getVoteCount, hasVoted, recordVote } from '../../lib/kv';
import { createVoterHash } from '../../lib/voting';

export const POST: APIRoute = async ({ request }) => {
  let body: { eventSlug?: string; projectId?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: 'invalid_body' }, { status: 400 });
  }

  const { eventSlug, projectId } = body;
  if (!eventSlug || !projectId) {
    return Response.json({ success: false, error: 'missing_fields' }, { status: 400 });
  }

  const event = await loadEvent(eventSlug);
  if (!event || !findProject(event, projectId)) {
    return Response.json({ success: false, error: 'not_found' }, { status: 404 });
  }

  if (!isVotingOpen(event)) {
    return Response.json({ success: false, error: 'voting_closed' }, { status: 403 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const fingerprint = `${request.headers.get('user-agent') ?? ''}:${request.headers.get('accept-language') ?? ''}`;
  const voterHash = createVoterHash(
    ip,
    fingerprint,
    import.meta.env.VOTE_SALT ?? 'dev-salt',
  );

  if (await hasVoted(eventSlug, projectId, voterHash)) {
    const votes = await getVoteCount(eventSlug, projectId);
    return Response.json(
      { success: false, error: 'already_voted', votes },
      { status: 409 },
    );
  }

  const votes = await recordVote(eventSlug, projectId, voterHash);
  return Response.json({ success: true, votes });
};
