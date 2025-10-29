# Twilio Webhook URLs for STELLA

## Required Twilio Configuration

Configure the following webhook URLs in your [Twilio Phone Number Settings](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming):

### Staging Environment

Assuming your staging environment is hosted at a staging subdomain or preview URL, configure:

```
Voice Webhook (HTTP POST):
https://{STAGING_HOST}/api/stella/call/voice

Status Callback (HTTP POST):
https://{STAGING_HOST}/api/stella/call/status
```

**Replace `{STAGING_HOST}` with your actual staging hostname.**

Common staging patterns:
- `staging.vintaro.ai`
- `preview-{branch}.vintaro.ai`
- Vercel: `{project}-git-{branch}-{team}.vercel.app`
- Netlify: `{branch}--{site}.netlify.app`

### Production Environment

```
Voice Webhook (HTTP POST):
https://vintaro.ai/api/stella/call/voice

Status Callback (HTTP POST):
https://vintaro.ai/api/stella/call/status
```

## Example: Complete Twilio Configuration

1. Go to https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
2. Select your phone number
3. Scroll to "Voice Configuration"
4. Set the following:

| Field | Value |
|-------|-------|
| **A CALL COMES IN** | Webhook |
| **URL** | `https://{your-host}/api/stella/call/voice` |
| **HTTP Method** | POST |
| **Status Callback URL** | `https://{your-host}/api/stella/call/status` |
| **HTTP Method** | POST |

5. Click "Save"

## Testing Webhooks Locally

For local development, use a tunnel service:

### Using ngrok

```bash
# Start your backend server
npm run dev:server

# In another terminal, start ngrok
ngrok http 3001
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`) and configure Twilio:

```
Voice Webhook: https://abc123.ngrok.io/api/stella/call/voice
Status Callback: https://abc123.ngrok.io/api/stella/call/status
```

### Using localtunnel

```bash
# Start your backend server
npm run dev:server

# In another terminal, start localtunnel
npx localtunnel --port 3001
```

## Verifying Webhook Configuration

Test your webhooks:

```bash
# Test voice endpoint returns TwiML
curl -X POST https://{your-host}/api/stella/call/voice

# Expected: XML response with <Response> and <Say> elements
```

## Troubleshooting

### Issue: Webhook returns 404

- **Check**: Ensure backend is deployed and running
- **Check**: Verify the URL path includes `/api/stella/call/voice`
- **Check**: Look at deployment logs for errors

### Issue: Webhook times out

- **Check**: Backend must respond within 10 seconds
- **Check**: Ensure backend is accessible via HTTPS
- **Check**: Check firewall/security group rules

### Issue: No audio on call

- **Check**: WebSocket endpoint is accessible at `/api/stella/call/stream`
- **Check**: Backend logs show WebSocket connection
- **Check**: TwiML includes correct `<Connect><Stream>` tags

## Security Notes

- Twilio webhooks require HTTPS in production
- Implement Twilio signature validation (currently marked as TODO)
- Never expose your `TWILIO_AUTH_TOKEN` in client-side code
- Use environment variables for all sensitive configuration

## Additional Resources

- [Twilio Voice Webhooks Documentation](https://www.twilio.com/docs/voice/webhooks)
- [Twilio Media Streams Guide](https://www.twilio.com/docs/voice/media-streams)
- [STELLA Implementation Guide](./README_STELLA.md)
