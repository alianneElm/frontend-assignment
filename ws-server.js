const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`Client connected. Total: ${clients.size}`);

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`Client disconnected. Total: ${clients.size}`);
  });
});

// Simulates device status changes every 5 seconds
setInterval(() => {
  const event = {
    type: 'DEVICE_STATUS_CHANGED',
    payload: {
      deviceId: Math.floor(Math.random() * 10) + 1,
      connected: Math.random() > 0.3,
      enabled: Math.random() > 0.1,
    }
  };

  const message = JSON.stringify(event);
  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(message);
    }
  }
}, 5000);

console.log('WebSocket server running on ws://localhost:8080');
