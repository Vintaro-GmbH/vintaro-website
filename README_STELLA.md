# STELLA - AI-Powered Communication System

STELLA (Stellar Telecommunications & Live Language Agent) is Vintaro's AI-powered communication system featuring both voice calls and live chat capabilities.

## Features

- **AI Call Agent**: Voice-based AI assistant powered by Twilio Media Streams
- **AI Chat**: Real-time text-based chat with server-sent events (SSE)
- **Feature Flags**: Easy enable/disable of features via environment variables
- **Consent Management**: GDPR-compliant consent flow with IP hashing
- **Multi-Provider Support**: Adapter architecture for Twilio, Retell, and VAPI

## Architecture

```
┌─────────────────┐
│  Frontend (UI)  │  Vite + React + shadcn/ui
├─────────────────┤
│  Consent Modal  │  A11y-compliant consent dialogs
│  Chat Drawer    │  SSE-based streaming chat
└────────┬────────┘
         │ HTTP/WS
┌────────┴────────┐
│  Backend API    │  Express + WebSocket
├─────────────────┤
│  /consent       │  POST - Log user consent
│  /call/voice    │  POST - Twilio webhook (TwiML)
│  /call/stream   │  WS - Media stream handler
│  /call/status   │  POST - Call lifecycle events
│  /call/token    │  GET - Feature config
│  /chat/stream   │  GET - SSE chat stream
└────────┬────────┘
         │
┌────────┴────────┐
│  Adapters       │  Provider-specific implementations
├─────────────────┤
│  Twilio         │  ✅ Implemented
│  Retell         │  🚧 Stub
│  VAPI           │  🚧 Stub
└────────┬────────┘
         │
┌────────┴────────┐
│  LLM Interface  │  Provider-agnostic realtime AI
├─────────────────┤
│  OpenAI         │  🚧 Stub (Realtime API)
│  Anthropic      │  🚧 Future
└─────────────────┘
```

## Environment Variables

### Feature Flags (Frontend)

```bash
# Enable/disable features (0=off, 1=on)
NEXT_PUBLIC_STELLA_CALL=0
NEXT_PUBLIC_STELLA_CHAT=0
```

### Server Configuration

```bash
# Provider selection
STELLA_PROVIDER=twilio  # Options: twilio | retell | vapi

# Server port (default: 3001)
STELLA_SERVER_PORT=3001

# Security salt for IP hashing
SECRET_SALT=your_random_salt_here
```

### Twilio Configuration

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_NUMBER=+1234567890
```

### Optional

```bash
# Custom consent text (German)
STELLA_CONSENT_TEXT_DE="Your custom consent message here"
```

## Twilio Webhook URLs

Configure these URLs in your [Twilio Console](https://console.twilio.com/):

### Development (using ngrok or similar tunnel)

```
Voice Webhook:  https://{your-tunnel-url}/api/stella/call/voice
Status Callback: https://{your-tunnel-url}/api/stella/call/status
```

### Staging

```
Voice Webhook:  https://{staging-host}/api/stella/call/voice
Status Callback: https://{staging-host}/api/stella/call/status
```

### Production

```
Voice Webhook:  https://vintaro.ai/api/stella/call/voice
Status Callback: https://vintaro.ai/api/stella/call/status
```

**Important**: Twilio requires HTTPS for webhooks. Use a tunnel service (ngrok, localtunnel) for local development.

## Installation

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in your Twilio credentials and other required values in `.env.local`

## Development

### Run Frontend Only

```bash
npm run dev
```

Frontend will be available at `http://localhost:8080`

### Run Backend Only

```bash
npm run dev:server
```

Backend will be available at `http://localhost:3001`

### Run Both (Recommended)

```bash
npm run dev:all
```

This runs both frontend and backend concurrently.

## Building

### Build Frontend

```bash
npm run build
```

### Build Backend

```bash
npm run build:server
```

### Run Production Backend

```bash
npm run start:server
```

## Testing Checklist

### QA - Feature Flags OFF (Default State)

- [ ] Load homepage - no console errors
- [ ] Navigate to contact section
- [ ] "Call (AI-Callagent)" tile shows Beta badge
- [ ] "Live Chat" tile shows Beta badge
- [ ] Both AI tiles are dimmed (opacity-50)
- [ ] Hover over AI tiles shows "Bald verfügbar" tooltip
- [ ] Clicking AI tiles does nothing
- [ ] Email and Meeting tiles work normally
- [ ] No visual drift from original design

### QA - Chat Feature Enabled

1. Set `NEXT_PUBLIC_STELLA_CHAT=1` in `.env.local`
2. Restart dev server
3. Test:
   - [ ] Chat tile is no longer dimmed
   - [ ] Clicking chat tile opens consent modal
   - [ ] Consent modal has focus trap (ESC closes, Tab cycles)
   - [ ] Accepting consent opens chat drawer
   - [ ] Chat drawer streams welcome message
   - [ ] Can send messages and receive SSE responses
   - [ ] Declining consent closes modal, no further action
   - [ ] Console shows consent POST to `/api/stella/consent`

### QA - Call Feature Enabled

1. Set `NEXT_PUBLIC_STELLA_CALL=1` in `.env.local`
2. Ensure backend is running (`npm run dev:server`)
3. Test:
   - [ ] Call tile is no longer dimmed
   - [ ] Clicking call tile opens consent modal
   - [ ] Accepting consent triggers `tel:+43512385144` link
   - [ ] Console shows consent POST to `/api/stella/consent`
   - [ ] Backend logs show consent received

### QA - Backend Endpoints

With backend running:

- [ ] GET `http://localhost:3001/health` returns `{"status":"ok"}`
- [ ] GET `http://localhost:3001/api/stella/call/token` returns feature config
- [ ] POST `http://localhost:3001/api/stella/consent` with body `{"type":"chat","consent":true}` returns success
- [ ] GET `http://localhost:3001/api/stella/chat/stream` streams SSE data
- [ ] POST `http://localhost:3001/api/stella/call/voice` returns TwiML XML

### QA - Twilio Integration (Requires Twilio Account)

1. Set up Twilio credentials in `.env.local`
2. Expose backend via ngrok: `ngrok http 3001`
3. Configure Twilio phone number with webhook URL
4. Test:
   - [ ] Call your Twilio number
   - [ ] Hear consent message in German (Polly.Vicki voice)
   - [ ] Call connects to WebSocket stream
   - [ ] Backend logs show WebSocket connection
   - [ ] Call status updates are logged

## Staging Deployment

1. Deploy backend to your staging server
2. Set environment variables on server
3. Configure Twilio webhooks to point to staging URLs:

```
https://{staging-host}/api/stella/call/voice
https://{staging-host}/api/stella/call/status
```

4. Enable features by setting flags to "1"
5. Test using the QA checklist above

## Security Considerations

- All consent logs hash IP addresses using SHA-256 + salt
- Twilio webhook signature validation is planned (TODO)
- Environment variables must never be committed to git
- Backend should be behind HTTPS in production
- Rate limiting should be implemented for production

## Future Enhancements

- [ ] Implement OpenAI Realtime API integration
- [ ] Add Retell and VAPI adapter implementations
- [ ] Twilio webhook signature validation
- [ ] Persistent storage for consent logs (database)
- [ ] Rate limiting and DDoS protection
- [ ] Multi-language support (currently German primary)
- [ ] Conversation history and analytics
- [ ] Admin dashboard for monitoring
- [ ] A/B testing framework

## Troubleshooting

### Frontend Issues

**Issue**: Features not responding
- **Solution**: Check console for errors, verify `.env.local` is loaded

**Issue**: Consent modal not opening
- **Solution**: Ensure feature flag is set to "1", restart dev server

### Backend Issues

**Issue**: Backend won't start
- **Solution**: Run `npm install` to ensure all dependencies are installed

**Issue**: CORS errors
- **Solution**: Verify backend is running on port 3001, check CORS middleware

**Issue**: Twilio webhooks timing out
- **Solution**: Check if backend is accessible via HTTPS, verify webhook URL in Twilio console

### Twilio Issues

**Issue**: No audio/silence on call
- **Solution**: Check WebSocket connection logs, verify TwiML is generated correctly

**Issue**: "Not Found" error on webhook
- **Solution**: Verify webhook URL includes `/api/stella/call/voice` path

## Support

For issues or questions:
- Internal: Contact the Vintaro dev team
- Twilio: https://www.twilio.com/docs
- Documentation: This file

## License

Proprietary - Vintaro GmbH
