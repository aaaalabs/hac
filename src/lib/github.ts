const REPO = import.meta.env.GITHUB_REPO ?? 'aaaalabs/hac';
const TOKEN = import.meta.env.GITHUB_TOKEN;
const API = 'https://api.github.com';

const headers = () => ({
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
});

export async function getJsonFile<T>(path: string): Promise<{ data: T; sha: string } | null> {
  const res = await fetch(`${API}/repos/${REPO}/contents/${path}`, { headers: headers() });
  if (!res.ok) return null;
  const file = await res.json();
  const data = JSON.parse(Buffer.from(file.content, 'base64').toString('utf-8')) as T;
  return { data, sha: file.sha as string };
}

export async function putJsonFile(
  path: string,
  content: unknown,
  message: string,
  sha?: string,
): Promise<boolean> {
  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(JSON.stringify(content, null, 2) + '\n').toString('base64'),
    branch: 'main',
  };
  if (sha) body.sha = sha;
  const res = await fetch(`${API}/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  });
  return res.ok;
}
