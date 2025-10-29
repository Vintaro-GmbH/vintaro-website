import { Request } from 'express';

export class TwilioAdapter {
  private accountSid: string;
  private authToken: string;
  private phoneNumber: string;

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || '';
    this.authToken = process.env.TWILIO_AUTH_TOKEN || '';
    this.phoneNumber = process.env.TWILIO_NUMBER || '';

    if (!this.accountSid || !this.authToken) {
      console.warn('[TWILIO] Missing credentials. Voice features will not work.');
    }
  }

  /**
   * Generate TwiML response for incoming calls
   * Plays consent message, then connects to Media Stream
   */
  generateVoiceTwiML(req: Request): string {
    const host = req.get('host') || 'localhost:3001';
    const protocol = host.includes('localhost') ? 'ws' : 'wss';
    const streamUrl = `${protocol}://${host}/api/stella/call/stream`;

    // Load consent text from environment or use default
    const consentText = process.env.STELLA_CONSENT_TEXT_DE ||
      'Willkommen bei Vintaro. Dieser Anruf wird aufgezeichnet und mit künstlicher Intelligenz verarbeitet. Durch Fortsetzen des Gesprächs stimmen Sie zu.';

    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Vicki" language="de-DE">${consentText}</Say>
  <Pause length="1"/>
  <Connect>
    <Stream url="${streamUrl}">
      <Parameter name="provider" value="twilio"/>
      <Parameter name="feature" value="stella-call"/>
    </Stream>
  </Connect>
</Response>`;
  }

  /**
   * Validate Twilio webhook signature (security)
   */
  validateSignature(signature: string, url: string, params: Record<string, any>): boolean {
    // TODO: Implement Twilio signature validation
    // https://www.twilio.com/docs/usage/security#validating-requests
    console.warn('[TWILIO] Signature validation not yet implemented');
    return true;
  }
}
