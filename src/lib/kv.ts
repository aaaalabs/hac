import { kv } from '@vercel/kv';
import { buildVoteKey, buildVotedKey, VOTE_TTL_SECONDS } from './voting';

export async function getVoteCount(
  eventSlug: string,
  projectId: string,
): Promise<number> {
  return (await kv.get<number>(buildVoteKey(eventSlug, projectId))) ?? 0;
}

export async function getAllVotes(
  eventSlug: string,
  projectIds: string[],
): Promise<Record<string, number>> {
  const counts = await Promise.all(
    projectIds.map(id => getVoteCount(eventSlug, id)),
  );
  return Object.fromEntries(projectIds.map((id, i) => [id, counts[i]]));
}

export async function hasVoted(
  eventSlug: string,
  projectId: string,
  voterHash: string,
): Promise<boolean> {
  return (
    (await kv.get(buildVotedKey(eventSlug, projectId, voterHash))) !== null
  );
}

export async function recordVote(
  eventSlug: string,
  projectId: string,
  voterHash: string,
): Promise<number> {
  const [newCount] = await Promise.all([
    kv.incr(buildVoteKey(eventSlug, projectId)),
    kv.set(buildVotedKey(eventSlug, projectId, voterHash), '1', {
      ex: VOTE_TTL_SECONDS,
    }),
  ]);
  return newCount;
}

const RATE_LIMIT_SECONDS = 10 * 60;

export async function isRateLimited(ip: string): Promise<number> {
  const ttl = await kv.ttl(`ratelimit:${ip}`);
  return ttl > 0 ? ttl : 0;
}

export async function setRateLimit(ip: string): Promise<void> {
  await kv.set(`ratelimit:${ip}`, '1', { ex: RATE_LIMIT_SECONDS });
}
