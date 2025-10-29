import { Request, Response } from 'express';
import { getTwilioAdapter } from '../stella/adapters/factory';

export const voiceHandler = (req: Request, res: Response) => {
  try {
    const provider = process.env.STELLA_PROVIDER || 'twilio';

    if (provider !== 'twilio') {
      return res.status(501).json({
        error: `Provider "${provider}" not yet implemented for voice calls`,
      });
    }

    const adapter = getTwilioAdapter();
    const twiml = adapter.generateVoiceTwiML(req);

    res.type('text/xml');
    res.send(twiml);
  } catch (error) {
    console.error('[VOICE WEBHOOK ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
