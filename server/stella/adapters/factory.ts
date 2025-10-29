import { TwilioAdapter } from './twilio';
import { RetellAdapter } from './retell';
import { VapiAdapter } from './vapi';

let twilioInstance: TwilioAdapter | null = null;
let retellInstance: RetellAdapter | null = null;
let vapiInstance: VapiAdapter | null = null;

export function getTwilioAdapter(): TwilioAdapter {
  if (!twilioInstance) {
    twilioInstance = new TwilioAdapter();
  }
  return twilioInstance;
}

export function getRetellAdapter(): RetellAdapter {
  if (!retellInstance) {
    retellInstance = new RetellAdapter();
  }
  return retellInstance;
}

export function getVapiAdapter(): VapiAdapter {
  if (!vapiInstance) {
    vapiInstance = new VapiAdapter();
  }
  return vapiInstance;
}

export function getAdapter() {
  const provider = process.env.STELLA_PROVIDER || 'twilio';

  switch (provider) {
    case 'twilio':
      return getTwilioAdapter();
    case 'retell':
      return getRetellAdapter();
    case 'vapi':
      return getVapiAdapter();
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
