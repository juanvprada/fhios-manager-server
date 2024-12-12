import { Server } from 'socket.io';
import { createServer } from 'http';
import {app} from '../app';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

export const emitNotification = (userId: number, notification: any) => {
  io.emit(`notification:${userId}`, notification);
};

export { httpServer };