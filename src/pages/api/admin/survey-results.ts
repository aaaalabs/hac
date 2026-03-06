export const prerender = false;

import type { APIRoute } from 'astro';
import { kv } from '@vercel/kv';

export const GET: APIRoute = async () => {
  const raw = await kv.lrange('survey:buildathon-0:responses', 0, -1);

  // Upstash auto-deserializes JSON — entries may already be objects or strings
  const entries = raw
    .map(s => {
      if (s && typeof s === 'object') return s;
      try { return JSON.parse(s as string); } catch { return null; }
    })
    .filter(Boolean);

  if (entries.length === 0) {
    return Response.json({ count: 0, mc: {}, ratings: {}, reasons: {} });
  }

  const mc: Record<string, Record<string, number>> = {};
  const ratingVals: Record<string, number[]> = {};
  const reasons: Record<string, string[]> = {};

  for (const entry of entries) {
    const a = entry.answers ?? {};
    for (const [key, val] of Object.entries(a)) {
      if (key === 'feedback' || key.endsWith('_reason')) {
        const text = String(val).trim();
        if (text) {
          const rkey = key === 'feedback' ? 'feedback' : key.replace('_reason', '');
          reasons[rkey] = reasons[rkey] ?? [];
          reasons[rkey].push(text);
        }
      } else if (key.startsWith('r-')) {
        const v = Number(val);
        if (v >= 1 && v <= 5) {
          ratingVals[key] = ratingVals[key] ?? [];
          ratingVals[key].push(v);
        }
      } else {
        const opt = String(val);
        mc[key] = mc[key] ?? {};
        mc[key][opt] = (mc[key][opt] ?? 0) + 1;
      }
    }
  }

  const ratings: Record<string, { avg: number; dist: number[] }> = {};
  for (const [key, vals] of Object.entries(ratingVals)) {
    const dist = [0, 0, 0, 0, 0];
    vals.forEach(v => dist[v - 1]++);
    const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
    ratings[key] = { avg: Math.round(avg * 10) / 10, dist };
  }

  const timestamps = entries.map((e: { ts?: number }) => e.ts).filter(Boolean) as number[];

  return Response.json({
    count: entries.length,
    firstAt: Math.min(...timestamps),
    lastAt: Math.max(...timestamps),
    mc,
    ratings,
    reasons,
  });
};
