import { Request, Response } from 'express';

export const tokenHandler = (req: Request, res: Response) => {
  try {
    const provider = process.env.STELLA_PROVIDER || 'twilio';
    const callEnabled = process.env.NEXT_PUBLIC_STELLA_CALL === '1';
    const chatEnabled = process.env.NEXT_PUBLIC_STELLA_CHAT === '1';

    res.json({
      enabled: callEnabled || chatEnabled,
      provider,
      features: {
        call: callEnabled,
        chat: chatEnabled,
      },
    });
  } catch (error) {
    console.error('[TOKEN ENDPOINT ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
