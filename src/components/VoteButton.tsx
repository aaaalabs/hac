import { useState } from 'react';

interface Props {
  eventSlug: string;
  projectId: string;
  projectName: string;
  initialCount: number;
  initialHasVoted: boolean;
  votingOpen: boolean;
}

export default function VoteButton({
  eventSlug,
  projectId,
  projectName,
  initialCount,
  initialHasVoted,
  votingOpen,
}: Props) {
  const [count, setCount] = useState(initialCount);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [isAnimating, setIsAnimating] = useState(false);
  const [justVoted, setJustVoted] = useState(false);

  async function handleVote() {
    if (!votingOpen || hasVoted) return;

    setCount(c => c + 1);
    setHasVoted(true);
    setIsAnimating(true);
    setJustVoted(true);
    setTimeout(() => setIsAnimating(false), 300);

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventSlug, projectId }),
      });
      const data = await res.json();

      if (res.status === 429) return;

      if (!res.ok || !data.success) {
        setCount(data.votes ?? count);
        setHasVoted(res.status === 409);
        setJustVoted(false);
      } else {
        setCount(data.votes);
        const existing = document.cookie
          .split('; ')
          .find(r => r.startsWith(`voted_${eventSlug}=`))
          ?.split('=')[1] ?? '';
        const ids = existing ? `${existing},${projectId}` : projectId;
        document.cookie = `voted_${eventSlug}=${ids}; max-age=${60 * 60 * 24 * 30}; path=/`;
      }
    } catch {
      setCount(c => c - 1);
      setHasVoted(false);
      setJustVoted(false);
    }
  }

  if (!votingOpen) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 min-h-[44px] text-[var(--text-muted)]">
        <span aria-hidden="true">▲</span>
        <span className="font-semibold tabular-nums">{count}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleVote}
        disabled={hasVoted}
        aria-label={`Vote für ${projectName}`}
        aria-pressed={hasVoted}
        className={[
          'flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-semibold transition-all duration-150 min-h-[44px] min-w-[44px] cursor-pointer',
          isAnimating ? 'animate-vote-pop' : '',
          hasVoted
            ? 'text-white'
            : 'border-[var(--mid-gray)] text-[var(--text-muted)] hover:border-[var(--orange)] hover:text-[var(--orange)] hover:scale-[1.02]',
        ]
          .filter(Boolean)
          .join(' ')}
        style={
          hasVoted
            ? {
                background: 'var(--orange)',
                borderColor: 'var(--orange)',
                boxShadow: '0 0 12px var(--orange-glow)',
              }
            : {}
        }
      >
        <span aria-hidden="true">▲</span>
        <span aria-live="polite" className="tabular-nums">
          {count}
        </span>
      </button>

      {justVoted && (
        <a
          href="https://luma.com/genai-collective"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--text-muted)] hover:text-[var(--orange)] transition-colors leading-tight"
        >
          📅 Events folgen
        </a>
      )}
    </div>
  );
}
