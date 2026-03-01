import { describe, it, expect } from 'vitest';
import { createVoterHash, buildVoteKey, buildVotedKey } from './voting';

describe('createVoterHash', () => {
  it('produces a consistent SHA-256 hash for the same inputs', () => {
    const hash1 = createVoterHash('192.168.1.1', 'Mozilla/5.0:de-AT', 'test-salt');
    const hash2 = createVoterHash('192.168.1.1', 'Mozilla/5.0:de-AT', 'test-salt');
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64); // SHA-256 hex = 64 chars
  });

  it('produces different hashes for different IPs', () => {
    const hash1 = createVoterHash('192.168.1.1', 'Mozilla/5.0:de-AT', 'test-salt');
    const hash2 = createVoterHash('10.0.0.1', 'Mozilla/5.0:de-AT', 'test-salt');
    expect(hash1).not.toBe(hash2);
  });

  it('produces different hashes when salt changes', () => {
    const hash1 = createVoterHash('192.168.1.1', 'Mozilla/5.0:de-AT', 'salt-a');
    const hash2 = createVoterHash('192.168.1.1', 'Mozilla/5.0:de-AT', 'salt-b');
    expect(hash1).not.toBe(hash2);
  });
});

describe('buildVoteKey', () => {
  it('returns votes:{eventSlug}:{projectId}', () => {
    expect(buildVoteKey('ideen-fuer-tirol', 'tirolguide-ai'))
      .toBe('votes:ideen-fuer-tirol:tirolguide-ai');
  });
});

describe('buildVotedKey', () => {
  it('returns voted:{eventSlug}:{projectId}:{hash}', () => {
    expect(buildVotedKey('ideen-fuer-tirol', 'tirolguide-ai', 'abc123'))
      .toBe('voted:ideen-fuer-tirol:tirolguide-ai:abc123');
  });
});
