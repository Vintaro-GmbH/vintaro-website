import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { stellaRoutes } from './routes/stella';
import { setupWebSocketHandler } from './websocket/stellaStream';

dotenv.config({ path: '.env.local' });

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/api/stella/call/stream' });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// STELLA API routes
app.use('/api/stella', stellaRoutes);

// WebSocket setup
setupWebSocketHandler(wss);

const PORT = process.env.STELLA_SERVER_PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 STELLA Backend Server running on port ${PORT}`);
  console.log(`📞 Twilio Voice Webhook: http://localhost:${PORT}/api/stella/call/voice`);
  console.log(`📊 Call Status Webhook: http://localhost:${PORT}/api/stella/call/status`);
  console.log(`🔌 WebSocket Stream: ws://localhost:${PORT}/api/stella/call/stream`);
  console.log(`💬 Chat Stream: http://localhost:${PORT}/api/stella/chat/stream`);
});

export { app, server, wss };
