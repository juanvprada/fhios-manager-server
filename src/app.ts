// src/app.ts
import express from 'express';
import http from 'http';
import { WebSocketService } from './services/websocket.service';
import { NotificationService } from './services/notification.service';

const app = express();
const server = http.createServer(app);

// Inicializar WebSocket
const wsService = new WebSocketService(server);
NotificationService.initialize(wsService);

// ... resto de la configuración del servidor