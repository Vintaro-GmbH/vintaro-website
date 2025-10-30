import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      // Health check
      return res.status(200).json({ ok: true, ts: Date.now() });
    }
    if (req.method === 'POST') {
      // Log only NON-PII meta
      const { CallSid, CallStatus, Direction, Duration, Timestamp } = (req.body ?? {}) as any;
      console.log('[CALL STATUS]', { CallSid, CallStatus, Direction, Duration, Timestamp });
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send('ok');
    }
    res.setHeader('Content-Type', 'text/plain');
    return res.status(405).send('ok');
  } catch (error) {
    console.error('[STATUS WEBHOOK ERROR]', error);
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send('ok');
  }
}
