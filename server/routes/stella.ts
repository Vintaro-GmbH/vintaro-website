import { Router } from 'express';
import { consentHandler } from '../handlers/consent';
import { voiceHandler } from '../handlers/voice';
import { statusHandler } from '../handlers/status';
import { tokenHandler } from '../handlers/token';
import { chatStreamHandler } from '../handlers/chatStream';

const router = Router();

// Consent endpoint
router.post('/consent', consentHandler);

// Call endpoints
router.post('/call/voice', voiceHandler);
router.post('/call/status', statusHandler);
router.get('/call/token', tokenHandler);

// Chat endpoint
router.get('/chat/stream', chatStreamHandler);

export { router as stellaRoutes };
