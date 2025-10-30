import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless Function for Media Stream (Placeholder)
 * This endpoint is not yet wired - returns 501 Not Implemented
 * Future: Will handle WebSocket upgrade for Twilio Media Streams
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Return 501 Not Implemented
  res.setHeader('Content-Type', 'application/json');
  return res.status(501).json({
    error: 'media stream not wired yet',
  });
}
