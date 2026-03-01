import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

export interface Project {
  id: string;
  name: string;
  description: string;
  team: string[];
  tool: string;
  appUrl: string;
  screenshotPath: string;
  demoVideoUrl: string | null;
}

export interface AicEvent {
  slug: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  participantCount?: number;
  votingEndsAt?: string;
  lumaUrl?: string;
  featured?: boolean;
  projects: Project[];
}

export function isVotingOpen(event: AicEvent): boolean {
  if (!event.votingEndsAt) return true;
  return new Date(event.votingEndsAt) > new Date();
}

export function sortProjectsByVotes(
  projects: Project[],
  votes: Record<string, number>,
): Project[] {
  return [...projects].sort((a, b) => (votes[b.id] ?? 0) - (votes[a.id] ?? 0));
}

export function shuffleProjects(projects: Project[]): Project[] {
  const arr = [...projects];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const EVENTS_DIR = join(process.cwd(), 'src', 'content', 'events');

export async function loadAllEvents(): Promise<AicEvent[]> {
  const files = await readdir(EVENTS_DIR);
  const events = await Promise.all(
    files
      .filter((f: string) => f.endsWith('.json') && !f.startsWith('_'))
      .map(
        async (f: string) =>
          JSON.parse(await readFile(join(EVENTS_DIR, f), 'utf-8')) as AicEvent,
      ),
  );
  return events.sort((a: AicEvent, b: AicEvent) =>
    b.date.localeCompare(a.date),
  );
}

export async function loadEvent(slug: string): Promise<AicEvent | null> {
  try {
    return JSON.parse(
      await readFile(join(EVENTS_DIR, `${slug}.json`), 'utf-8'),
    );
  } catch {
    return null;
  }
}

export function findProject(
  event: AicEvent,
  id: string,
): Project | undefined {
  return event.projects.find(p => p.id === id);
}
