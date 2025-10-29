/**
 * VAPI Adapter (Stub)
 * https://vapi.ai/
 */

export class VapiAdapter {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.VAPI_API_KEY || '';
    console.warn('[VAPI] Adapter is a stub. Implementation pending.');
  }

  // TODO: Implement VAPI-specific methods
  // - Create assistant
  // - Handle phone calls
  // - Manage conversations
}
