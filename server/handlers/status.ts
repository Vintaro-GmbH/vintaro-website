import { Request, Response } from 'express';

export const statusHandler = (req: Request, res: Response) => {
  try {
    const {
      CallSid,
      CallStatus,
      From,
      To,
      Direction,
      Duration,
      Timestamp,
    } = req.body;

    console.log('[CALL STATUS]', {
      sid: CallSid,
      status: CallStatus,
      from: From,
      to: To,
      direction: Direction,
      duration: Duration,
      timestamp: Timestamp,
    });

    // TODO: Implement call lifecycle tracking
    // - Store in database
    // - Trigger analytics
    // - Update real-time dashboards

    res.sendStatus(200);
  } catch (error) {
    console.error('[STATUS WEBHOOK ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
