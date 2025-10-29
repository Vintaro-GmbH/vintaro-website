import { WebSocketServer, WebSocket } from 'ws';

export function setupWebSocketHandler(wss: WebSocketServer) {
  wss.on('connection', (ws: WebSocket) => {
    console.log('[WS] New WebSocket connection established');

    ws.on('message', (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());

        // Handle Twilio Media Streams format
        if (message.event === 'connected') {
          console.log('[WS] Twilio Media Stream connected:', message.protocol);
          ws.send(JSON.stringify({ event: 'ack', streamSid: message.streamSid }));
        } else if (message.event === 'start') {
          console.log('[WS] Stream started:', message.start);
          // TODO: Initialize LLM realtime connection
        } else if (message.event === 'media') {
          // Incoming audio from Twilio (base64 mulaw)
          const audioPayload = message.media.payload;
          // TODO: Send to LLM for processing
          // console.log('[WS] Received audio chunk:', audioPayload.length);

          // Echo back for testing (remove in production)
          // ws.send(JSON.stringify({
          //   event: 'media',
          //   streamSid: message.streamSid,
          //   media: { payload: audioPayload }
          // }));
        } else if (message.event === 'stop') {
          console.log('[WS] Stream stopped:', message.stop);
          // TODO: Clean up LLM connection
        }
      } catch (error) {
        console.error('[WS ERROR] Failed to parse message:', error);
      }
    });

    ws.on('close', () => {
      console.log('[WS] WebSocket connection closed');
      // TODO: Clean up resources
    });

    ws.on('error', (error) => {
      console.error('[WS ERROR]', error);
    });
  });

  console.log('[WS] WebSocket handler set up successfully');
}
