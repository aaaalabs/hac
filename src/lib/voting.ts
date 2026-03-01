import { createHash } from 'node:crypto';

export function createVoterHash(
  ip: string,
  fingerprint: string,
  salt: string,
): string {
  return createHash('sha256')
    .update(`${salt}:${ip}:${fingerprint}`)
    .digest('hex');
}

export function buildVoteKey(eventSlug: string, projectId: string): string {
  return `votes:${eventSlug}:${projectId}`;
}

export function buildVotedKey(
  eventSlug: string,
  projectId: string,
  voterHash: string,
): string {
  return `voted:${eventSlug}:${projectId}:${voterHash}`;
}

export const VOTE_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 Tage
