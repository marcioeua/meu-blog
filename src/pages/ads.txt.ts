import type { APIRoute } from 'astro';
import { ADSENSE } from '../config';

// Gera /ads.txt automaticamente a partir do ID configurado em src/config.ts
export const GET: APIRoute = () => {
  const pubId = ADSENSE.client.replace(/^ca-/, '');
  const body = pubId ? `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n` : '# Configure ADSENSE.client em src/config.ts\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
