/**
 * Retell AI Adapter (Stub)
 * https://www.retellai.com/
 */

export class RetellAdapter {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.RETELL_API_KEY || '';
    console.warn('[RETELL] Adapter is a stub. Implementation pending.');
  }

  // TODO: Implement Retell-specific methods
  // - Create agent
  // - Handle phone calls
  // - Manage conversations
}
