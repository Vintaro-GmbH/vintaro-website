import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Minimal TwiML to verify endpoint works
  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Say>STELLA ready.</Say></Response>`;
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml);
}
