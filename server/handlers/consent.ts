import { Request, Response } from 'express';
import crypto from 'crypto';

// In-memory consent log (in production, use a database)
const consentLog: Array<{
  hashedIp: string;
  type: 'call' | 'chat';
  consent: boolean;
  timestamp: string;
}> = [];

function hashIp(ip: string): string {
  const salt = process.env.SECRET_SALT || 'default-salt-change-in-production';
  return crypto
    .createHash('sha256')
    .update(ip + salt)
    .digest('hex');
}

export const consentHandler = (req: Request, res: Response) => {
  try {
    const { type, consent } = req.body;

    if (!type || typeof consent !== 'boolean') {
      return res.status(400).json({
        error: 'Invalid request. Required fields: type (call|chat), consent (boolean)',
      });
    }

    if (type !== 'call' && type !== 'chat') {
      return res.status(400).json({
        error: 'Invalid type. Must be "call" or "chat"',
      });
    }

    // Get client IP (handles proxy/load balancer scenarios)
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      'unknown';

    const hashedIp = hashIp(ip);
    const timestamp = new Date().toISOString();

    // Log consent
    consentLog.push({
      hashedIp,
      type,
      consent,
      timestamp,
    });

    console.log(`[CONSENT] Type: ${type}, Consent: ${consent}, IP Hash: ${hashedIp.substring(0, 8)}..., Time: ${timestamp}`);

    res.json({
      success: true,
      timestamp,
    });
  } catch (error) {
    console.error('[CONSENT ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export for potential analytics/debugging
export { consentLog };
