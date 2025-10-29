import { Request, Response } from 'express';

export const chatStreamHandler = (req: Request, res: Response) => {
  try {
    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable buffering in nginx

    // Send initial connection message
    res.write(`data: ${JSON.stringify({ type: 'connected', timestamp: new Date().toISOString() })}\n\n`);

    // Mock streaming response (3 tokens as placeholder)
    const tokens = [
      'Hallo! ',
      'Ich bin STELLA, ',
      'Ihr KI-Assistent. Wie kann ich Ihnen heute helfen?',
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < tokens.length) {
        res.write(`data: ${JSON.stringify({ type: 'token', content: tokens[index] })}\n\n`);
        index++;
      } else {
        res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
        clearInterval(interval);
        res.end();
      }
    }, 500);

    // Handle client disconnect
    req.on('close', () => {
      clearInterval(interval);
      console.log('[CHAT STREAM] Client disconnected');
    });

    // TODO: Replace with actual LLM integration
    // - Connect to OpenAI/Anthropic/etc.
    // - Stream real responses
    // - Handle conversation history
    // - Implement RAG if needed
  } catch (error) {
    console.error('[CHAT STREAM ERROR]', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
